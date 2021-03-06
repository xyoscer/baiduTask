/**
 * 指挥官,使用单例模式来作为命名空间的管理
 */
var commander = {
    //指挥官的记事本
    notebook: {
        //各个轨道的状态
        orbitStatus: [false, false, false, false]
    },
    //创建飞船
    createSpaceShip: function(orbitId,flyrate,dischargerate,chargerate) {
        //记录中该轨道已经有飞船了
        if(this.notebook.orbitStatus[orbitId]) {
            log("[指挥官]:"+"轨道" + (orbitId + 1) + "上已经存在飞船！", "blue");

            return;
        }
        this.notebook.orbitStatus[orbitId] = true;        
        log("[指挥官]:"+"在轨道" + (orbitId + 1) + "上创建飞船指令已发出！", "yellow");
        Mediator.sendMessage({
            id: orbitId,
            flyrate: flyrate,
            dischargerate: dischargerate,
            chargerate: chargerate,
            command: 'create'
        });
        //spaceManager.Mediator.createSpaceShip(orbitId);
    },
    //开始飞行
    start: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("[指挥官]:"+"轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("[指挥官]:"+"向轨道" + (orbitId + 1) + "发送开始飞行指令！", "yellow");
        //发送广播消息
        Mediator.sendMessage({
            id: orbitId,
            command: 'start'
        });
    },
    //停止飞行
    stop: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("[指挥官]:"+"轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("[指挥官]:"+"向轨道" + (orbitId + 1) + "发送停止飞行指令！", "yellow");
        //发送广播消息
        Mediator.sendMessage({
            id: orbitId,
            command: 'stop'
        });
    },
    //飞船自爆
    destroy: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("[指挥官]:"+"轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        //从记录中删除飞船
        this.notebook.orbitStatus[orbitId] = false;
        log("[指挥官]:"+"向轨道" + (orbitId + 1) + "发送销毁指令！", "yellow");
        //发送广播消息
        Mediator.sendMessage({
            id: orbitId,
            command: 'destroy'
        });
    }
   
    
};