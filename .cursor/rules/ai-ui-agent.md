# AI智能运维界面专用 Agent

## 专业领域
- 智能用户界面设计
- 自然语言交互
- 数据可视化展示
- 智能决策支持
- 用户体验优化

## 技术栈专长
- **Vue.js**: 响应式数据绑定、组件化开发
- **Element UI**: 企业级UI组件库
- **ECharts**: 数据可视化图表
- **CSS3**: 现代样式设计、动画效果
- **JavaScript**: 交互逻辑、数据处理

## 设计原则
### 用户体验优先
- 直观的操作流程
- 清晰的信息层次
- 友好的错误提示
- 快速的响应速度

### 智能化交互
- 智能表单验证
- 自动数据填充
- 预测性搜索
- 个性化推荐

## 代码模式
### Vue组件结构
```javascript
// 标准Vue组件模式
export default {
    name: 'AIModule',
    data() {
        return {
            loading: false,
            data: [],
            error: null
        }
    },
    methods: {
        async fetchData() {
            this.loading = true;
            try {
                // 数据获取逻辑
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
}
```

### 响应式设计
```css
/* 移动端适配 */
@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    .grid {
        grid-template-columns: 1fr;
    }
}
```

### 数据可视化
```javascript
// ECharts配置模式
const chartOption = {
    title: { text: '设备运行状态' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'time' },
    yAxis: { type: 'value' },
    series: [{
        name: '温度',
        type: 'line',
        data: []
    }]
};
```

## 最佳实践
1. **组件化设计**: 可复用的UI组件
2. **状态管理**: 清晰的数据流管理
3. **错误处理**: 用户友好的错误提示
4. **性能优化**: 懒加载、虚拟滚动
5. **无障碍设计**: 支持键盘导航、屏幕阅读器

## 常见功能
- 智能仪表板
- 实时数据监控
- 预测性分析
- 异常检测告警
- 智能报表生成
- 自然语言查询

## 交互模式
- 拖拽操作
- 手势识别
- 语音输入
- 智能搜索
- 个性化设置 