/* 事件中心 */
class EventEmitter{
    subscribes: Map<string, Array<Function>>

    constructor() {
        this.subscribes = new Map()
    }

    /**
     * 事件订阅
     * @param type 订阅的事件名称
     * @param callback 触发的回调函数
     */
    on(type: string, callback: Function) {
        const sub = this.subscribes.get(type) || []
        sub.push(callback)  // 将新的订阅者加入订阅者集合中
        this.subscribes.set(type, sub)  // 更新原事件的订阅者集合
    }

    /**
     * 事件发布
     * @param type 发布的事件名称
     * @param args 发布事件的额外参数
     */
    emit(type: string, ...args: Array<any>) {
        const sub = this.subscribes.get(type) || []
        const context = this
        sub.forEach(fn => {
            fn.call(context, ...args)
        })  // 依次调用所有订阅者（回调函数）
    }

    /**
     * 取消订阅
     * @param type 取消订阅的事件名称
     * @param callback 取消订阅的订阅者
     */
    off(type: string, callback: Function){
        const sub = this.subscribes.get(type)
        if(sub) { // 检查sub是否为空
            const newSub = sub.filter(fn => fn!==callback)  // 过滤掉该订阅者
            this.subscribes.set(type, newSub)  // 更新订阅者集合
        }
    }
}

const eventEmitter = new EventEmitter()

eventEmitter.on('eventName', () => {
    console.log('第一次订阅')
})
eventEmitter.emit('eventName')



