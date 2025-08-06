// 节点类型管理 - 逻辑文件

// 全局变量
let currentNodeTypes = [];

// 初始化函数
function initializeNodeTypeManagement() {
    // 从数据文件加载节点类型数据
    if (typeof nodeTypeData !== 'undefined') {
        currentNodeTypes = nodeTypeData.nodeTypes;
        renderNodeTypeTable();
    }
}

// 渲染节点类型表格
function renderNodeTypeTable() {
    const tableBody = document.getElementById('nodeTypeTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    currentNodeTypes.forEach(nodeType => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nodeType.name}</td>
            <td>${nodeType.code}</td>
            <td>${nodeType.description}</td>
            <td>${nodeType.allowedChildTypes}</td>
            <td><span class="status-badge ${getStatusClass(nodeType.status)}">${getStatusLabel(nodeType.status)}</span></td>
            <td>${nodeType.createTime}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-outline btn-sm" onclick="editNodeType('${nodeType.id}')">编辑</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteNodeType('${nodeType.id}')">删除</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 获取状态样式类
function getStatusClass(status) {
    const statusOption = nodeTypeData.statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.class : 'status-active';
}

// 获取状态标签
function getStatusLabel(status) {
    const statusOption = nodeTypeData.statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : '启用';
}

// 打开新增节点类型模态框
function openAddModal() {
    alert('打开新增节点类型模态框');
    // 这里可以添加实际的模态框逻辑
    // 例如：显示一个表单，让用户输入节点类型信息
}

// 编辑节点类型
function editNodeType(typeId) {
    alert('编辑节点类型: ' + typeId);
    // 这里可以添加实际的编辑逻辑
    // 例如：根据typeId找到对应的节点类型数据，然后显示编辑表单
}

// 删除节点类型
function deleteNodeType(typeId) {
    if (confirm('确定要删除这个节点类型吗？')) {
        // 从数据中删除
        const index = currentNodeTypes.findIndex(type => type.id === typeId);
        if (index > -1) {
            currentNodeTypes.splice(index, 1);
            renderNodeTypeTable();
            alert('删除节点类型: ' + typeId);
        }
    }
}

// 添加新的节点类型
function addNodeType(nodeTypeData) {
    // 验证数据
    if (!nodeTypeData.name || !nodeTypeData.code) {
        alert('请填写完整的节点类型信息');
        return false;
    }

    // 检查编码是否重复
    const existingType = currentNodeTypes.find(type => type.code === nodeTypeData.code);
    if (existingType) {
        alert('节点类型编码已存在，请使用其他编码');
        return false;
    }

    // 添加新节点类型
    const newNodeType = {
        id: generateId(),
        ...nodeTypeData,
        createTime: new Date().toISOString().split('T')[0]
    };

    currentNodeTypes.push(newNodeType);
    renderNodeTypeTable();
    return true;
}

// 更新节点类型
function updateNodeType(typeId, updatedData) {
    const index = currentNodeTypes.findIndex(type => type.id === typeId);
    if (index > -1) {
        // 保留原有的id和创建时间
        const originalType = currentNodeTypes[index];
        currentNodeTypes[index] = {
            ...originalType,
            ...updatedData
        };
        renderNodeTypeTable();
        return true;
    }
    return false;
}

// 生成唯一ID
function generateId() {
    return 'NODE_TYPE_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// 搜索节点类型
function searchNodeTypes(keyword) {
    if (!keyword) {
        renderNodeTypeTable();
        return;
    }

    const filteredTypes = currentNodeTypes.filter(type => 
        type.name.toLowerCase().includes(keyword.toLowerCase()) ||
        type.code.toLowerCase().includes(keyword.toLowerCase()) ||
        type.description.toLowerCase().includes(keyword.toLowerCase())
    );

    renderFilteredNodeTypeTable(filteredTypes);
}

// 渲染过滤后的节点类型表格
function renderFilteredNodeTypeTable(filteredTypes) {
    const tableBody = document.getElementById('nodeTypeTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    filteredTypes.forEach(nodeType => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nodeType.name}</td>
            <td>${nodeType.code}</td>
            <td>${nodeType.description}</td>
            <td>${nodeType.allowedChildTypes}</td>
            <td><span class="status-badge ${getStatusClass(nodeType.status)}">${getStatusLabel(nodeType.status)}</span></td>
            <td>${nodeType.createTime}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-outline btn-sm" onclick="editNodeType('${nodeType.id}')">编辑</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteNodeType('${nodeType.id}')">删除</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 导出节点类型数据
function exportNodeTypes(format = 'json') {
    if (format === 'json') {
        const dataStr = JSON.stringify(currentNodeTypes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        downloadFile(dataBlob, 'node-types.json');
    } else if (format === 'csv') {
        const csvContent = convertToCSV(currentNodeTypes);
        const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        downloadFile(dataBlob, 'node-types.csv');
    }
}

// 转换为CSV格式
function convertToCSV(data) {
    const headers = ['节点类型名称', '类型编码', '描述', '允许子节点类型', '状态', '创建时间'];
    const csvRows = [headers.join(',')];
    
    data.forEach(item => {
        const row = [
            item.name,
            item.code,
            item.description,
            item.allowedChildTypes,
            getStatusLabel(item.status),
            item.createTime
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

// 下载文件
function downloadFile(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNodeTypeManagement();
});

// 导出函数（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNodeTypeManagement,
        renderNodeTypeTable,
        openAddModal,
        editNodeType,
        deleteNodeType,
        addNodeType,
        updateNodeType,
        searchNodeTypes,
        exportNodeTypes
    };
} 