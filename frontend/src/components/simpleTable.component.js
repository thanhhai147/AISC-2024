import React from "react";
import { Table } from "antd";
import '../assets/css/simpleTable.css'; // Tùy chỉnh CSS nếu cần

export default function SimpleTable({ columns, data, emptyMessage, tableTitle }) {
    return (
        <div className="simple-table-container">
            <div className="table-title font-family-semibold">{tableTitle}</div>
            <Table
                className="simple-table"
                columns={columns || []} // Đảm bảo columns không undefined
                dataSource={data || []} // Đảm bảo data không undefined
                locale={{
                    emptyText: emptyMessage || 'Không có dữ liệu', // Hiển thị thông báo khi không có dữ liệu
                }}
                sticky={true} // Kích hoạt thanh cuộn dính
            />
        </div>
    );
}
