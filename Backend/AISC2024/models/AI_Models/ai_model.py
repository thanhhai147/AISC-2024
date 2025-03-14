import os
import google.generativeai as genai
import fitz
from PIL import Image
import io
# Cấu hình API key của Google Generative AI
os.environ["GOOGLE_API_KEY"] = "AIzaSyBwRi6f7aoxXxpwy5RhOThn0cOOV9_zI50"
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel("models/gemini-1.5-flash")

def extract_text_from_pdf(pdf_content):
    pdf_text = ""
    with fitz.open(stream=pdf_content, filetype="pdf") as pdf:
        for page in pdf:
            pdf_text += page.get_text()
    return pdf_text

def extract_text_from_image(image_content):
    # Chuyển dữ liệu nhị phân thành ảnh sử dụng io.BytesIO
    image = Image.open(io.BytesIO(image_content))
    
    # Sử dụng mô hình GenerativeModel để trích xuất văn bản từ ảnh
    model1 = genai.GenerativeModel("models/gemini-1.5-pro")
    prompt = "Extract text from this image into editable text."
    response = model1.generate_content([prompt, image])
    
    # Lấy văn bản từ phản hồi của mô hình
    context = response.text
    return context

def generate_mcqs_from_text(context, number_mcqs=10, isExternalSearch = False):
    if context:
        context_clean = context.replace("\n", " ").replace("\\", "")
        if isExternalSearch:
            prompt = f"""
            You are an AI assistant helping the user generate multiple-choice questions (MCQs) based on the following text: '{context_clean}'
            Please generate {number_mcqs} MCQs from the text. Each question should have:
            - A clear question
            - Four answer options (labeled A, B, C, D)
            - Indicate which option is the correct answer.
            - Provide a brief explanation of why the correct answer is right.
            - Cite the relevant part of the document that supports the correct answer.
            The response must be in **Vietnamese**.

            Format:
                ## MCQ
                Question: [question]
                A) [option A]
                B) [option B]
                C) [option C]
                D) [option D]
            Answer: [The correct option for question]
            Explanation: [Explain why this is the correct answer]
            Supporting Text: [Relevant part of the document]
            
            Ensure you follow this format exactly when generating the questions.
            """
        else:
            prompt = f"""
            You are an AI assistant helping the user generate multiple-choice questions (MCQs) based on the following text: '{context_clean}'. 
            You may search for additional, relevant information to enhance the quality of the questions and answers if needed.
            Please generate {number_mcqs} MCQs from the text. Each question should have:
            - A clear question
            - Four answer options (labeled A, B, C, D)
            - Indicate which option is the correct answer.
            - Provide a brief explanation of why the correct answer is right.
            - Cite the relevant part of the document that supports the correct answer.
            The response must be in **Vietnamese**.

            Format:
                ## MCQ
                Question: [question]
                A) [option A]
                B) [option B]
                C) [option C]
                D) [option D]
            Answer: [The correct option for question]
            Explanation: [Explain why this is the correct answer]
            Supporting Text: [Relevant part of the document]
            
            Ensure you follow this format exactly when generating the questions.
            """
        response = model.generate_content(prompt).text.strip()
        mcqs = [mcq.strip() for mcq in response.split("## MCQ") if mcq.strip()]
        return mcqs

def modify_mcq(context, original_mcq, edit_request):
    context_clean = context.replace("\n", " ").replace("\\", "")
    custom_mcq_prompt = f"""
    You are an AI assistant helping the user generate a multiple-choice question based on the following text: '{context_clean}'
    The user is not satisfied with question: {original_mcq}
    Please revise the question according to the following request: {edit_request}.
    Note: Do not alter the question content or any answer options unrelated to the requested edits. 
    The question should have:
    - A clear question
    - Four answer options (labeled A, B, C, D)
    - Indicate which option is the correct answer.
    - Provide a brief explanation of why the correct answer is right.
    - Cite the relevant part of the document that supports the correct answer.
    The response must be in **Vietnamese**.

    Format:
        ## MCQ
        Question: [question]
        A) [option A]
        B) [option B]
        C) [option C]
        D) [option D]
    Answer: [The correct option for question (A,B,C or D)]
    Explanation: [Explain why this is the correct answer]
    Supporting Text: [Relevant part of the document]
    
    Ensure you follow this format exactly when generating the questions.
    """
    new_response = model.generate_content(custom_mcq_prompt).text.strip()
    new_mcq = new_response.split("## MCQ")[1].strip()
    return new_mcq

