$(function () {
    /**
     * 旋转元素
     * @param elementId 元素Id
     * @param currNumber 日期数值
     * @param translateNumber 元素距离中心点的距离
     */
    function rotateElement(elementId, currNumber, translateNumber) {
        const $id = $('#' + elementId + ' ul li');
        // 圆所包含的元素个数
        let circleSize = $id.size();
        // 计算平均每个角的弧度
        let circleDeg = 360 / circleSize;
        // 计算角的弧度偏差
        let offsetDeg = circleDeg * currNumber;
        // 对与当前时间匹配的元素添加样式并去除其它元素的样式
        $id.eq(currNumber).addClass('elementActive').siblings().removeClass('elementActive');
        // 渲染所有元素
        for (let i = 0; i < circleSize; ++i) {
            $id.eq(i).css({
                'transition': currNumber === 0 ? '' : '.8s transform',
                'transform': 'rotate(' + (circleDeg * i - offsetDeg) + 'deg) translate(' + translateNumber + 'px, 0px)'
            })
        }
    }

    function init(callback) {
        let date = new Date();
        $("#yearId ul li").text(date.getFullYear() + "年");
        rotateElement('secondId', date.getSeconds(), 305);
        rotateElement('minusId', date.getMinutes(), 255);
        rotateElement('hourId', date.getHours(), 205);
        rotateElement('weekId', date.getDay() - 1, 155);
        rotateElement('dayId', date.getDate() - 1, 115);
        rotateElement('monthId', date.getMonth(), 65);
        rotateElement('yearId', date.getFullYear(), 0);

        (callback instanceof Function) && callback();
    }

    // 先初始化
    init(function () {
        // 循环调度
        setInterval(function () {
            init();
        }, 1000);
    });

});