// 节点类型管理 - 数据文件
const nodeTypeData = {
    // 节点类型列表数据
    nodeTypes: [
        {
            id: 'FACTORY',
            name: '工厂',
            code: 'FACTORY',
            description: '企业级工厂节点，顶级组织单位',
            allowedChildTypes: '车间、能耗区域',
            status: 'active',
            createTime: '2024-01-15'
        },
        {
            id: 'WORKSHOP',
            name: '车间',
            code: 'WORKSHOP',
            description: '生产车间，包含多条产线',
            allowedChildTypes: '产线、工段',
            status: 'active',
            createTime: '2024-01-15'
        },
        {
            id: 'PRODUCTION_LINE',
            name: '产线',
            code: 'PRODUCTION_LINE',
            description: '生产线，包含多个工段',
            allowedChildTypes: '工段、设备',
            status: 'active',
            createTime: '2024-01-15'
        },
        {
            id: 'SECTION',
            name: '工段',
            code: 'SECTION',
            description: '生产工段，包含多个设备',
            allowedChildTypes: '设备',
            status: 'active',
            createTime: '2024-01-15'
        },
        {
            id: 'EQUIPMENT',
            name: '设备',
            code: 'EQUIPMENT',
            description: '生产设备，最小业务单元',
            allowedChildTypes: '无',
            status: 'active',
            createTime: '2024-01-15'
        },
        {
            id: 'ENERGY_ZONE',
            name: '能耗区域',
            code: 'ENERGY_ZONE',
            description: '能耗管理区域，自定义类型',
            allowedChildTypes: '设备',
            status: 'active',
            createTime: '2024-01-20'
        }
    ],

    // 状态选项
    statusOptions: [
        { value: 'active', label: '启用', class: 'status-active' },
        { value: 'inactive', label: '停用', class: 'status-inactive' }
    ],

    // 页面配置
    pageConfig: {
        title: '节点类型管理',
        description: '管理工厂模型中的节点类型，包括预设标准类型和自定义类型，控制建模层级合规性',
        cardTitle: '节点类型列表'
    }
};

// 导出数据（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = nodeTypeData;
} 