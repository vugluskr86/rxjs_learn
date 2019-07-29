class PullPushDemo {
    private data:number[] = [1, 2, 3, 4, 5];
    private count:number = 0;

    start():void {
        setInterval(()=>{
            if (this.count != this.data.length) {
                this.doData();
                this.count = this.data.length;
            } else {
                // console.log('No data');
            }
        }, 100);
    }

    doData():void {
        for (const value of this.data) {
            console.log(value);
        }

        this.data = [];
    }

    push(value:number):void {
        this.data.push(value);
    }
}

(()=> {
    const demo: PullPushDemo = new PullPushDemo();
    
    demo.start();

    demo.push(6);
    demo.push(7);
    demo.push(8);
    demo.push(9);

    setTimeout(() => {
        demo.push(10);
    }, 500);

    let index = 11;
    setInterval(() => {
        demo.push(index++);
    }, 2000)
})()
