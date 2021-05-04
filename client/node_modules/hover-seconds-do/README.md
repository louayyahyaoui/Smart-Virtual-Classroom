# hover-seconds-do

## 介绍
在某些场景，我们希望鼠标移到某个元素上，悬停几秒后能执行一些操作，但是鼠标稍微移动一下，时间重置，状态回退如初。在鼠标离开当前绑定的元素时，我们的页面回退如初。这个工具函数一定能帮到你。

## 例子
播放器一个很重要的功能：**鼠标悬停在视频播放界面时，在一定时间后鼠标会消失，视频下方的控制栏也会隐藏，呈现视频的最大可视化。但是鼠标稍微一动，一切恢复如初。**用一张简单的 gif 图来说明的话，是下面这样子的：![gif.gif](https://cdn.nlark.com/yuque/0/2019/gif/341314/1572492255580-7fb62a64-4c65-462a-8528-b9bd7d9ca811.gif#align=left&display=inline&height=424&name=gif.gif&originHeight=424&originWidth=824&search=&size=615788&status=done&width=824)

## 快速使用
### 安装
```bash
npm install --save hover-seconds-do
```

### 使用
- element: 你所希望操作的元素（比如上面 gif 中 “我是视频”这个 div 元素）
- secondsLaterDoFn: 你设定的时间之后，想做什么操作（比如上面 gif 中“鼠标消失，控制栏消失”）
- seconds: 你希望的时间，单位: ms（比如上面 gif 中我设定的时间为 2000ms）
- reNormalFn: 回归原样的操作（比如上面 gif 中控制栏和鼠标都回来）
```js
const hoversd = new window.HoverSD(element, secondsLaterDoFn, seconds, reNormalFn);
hoversd.secondsHoverEX();
// ...
// other code here
// ...
hoversd.removeElemEventListener();
```

### 项目运行
在终端一步一步执行：
```bash
git clone git@github.com:vortesnail/hover-seconds-do.git
npm install -g http-server
npm run example
```
即可查看样例

### 示例代码
我们拿上面的 gif 做例子：

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>example</title>
  <link rel="stylesheet" href="./index.css">
</head>
<body>
  <div class="box">我是视频
    <div class="test-box">我是视频控制栏</div>
  </div>
  <script src="./index.js"></script>
</body>
</html>
```

**index.css**
```css
.box {
  width: 400px;
  height: 200px;
  background-color: lightskyblue;
  text-align: center;
  line-height: 200px;
  color: #fff;
  position: relative;
  /* cursor: none; */
}

.box .test-box {
  position: absolute;
  width: 100%;
  height: 30px;
  left: 0;
  bottom: 0;
  background-color:lightgray;
  text-align: center;
  line-height: 30px;
}
```

**index.js**
```js
let box = document.querySelector('.box');

function hiddenTestBox() {
  let textBox = document.querySelector('.test-box');
  textBox.style.display = 'none';
  box.style.cursor = 'none';
}

function showTestBox() {
  let textBox = document.querySelector('.test-box');
  textBox.style.display = 'block';
  box.style.cursor = 'default';
}

let hoversd = new window.HoverSD(box, hiddenTestBox, 2000, showTestBox);
hoversd.secondsHoverEX();
// hoversd.removeElemEventListener();
```
## LICENSE
MIT
