## 两种盒子模型

###### 标准盒模型（宽度width只有content，盒子真实大小还包括了<u>padding, border, margin</u>)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207204001525.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1MzcwMDAy,size_16,color_FFFFFF,t_70#pic_center)



###### IE盒模型（宽度width已经包括了padding和border，盒子真实大小还要加上margin）





## 垂直水平居中

- 子绝父相 + top/left:50% + transform:translate(-50%, -50%)
- 子绝父相 + top/left/right/bottom: 0 + margin: auto（已知宽高）

- 父flex + justify-content: center + align-items: center （justify-content：设置主轴元素排列，align-items：设置交叉轴元素排列）
- 





## position种类

###### static

默认值，没有定位，遵循正常的文档流

###### fixed

相对于浏览器窗口

###### relative

相对定位元素

###### absolute

相对于static定位以外的第一个父元素进行定位，如果都没有则相对于<html>标签进行定位

###### sticky 粘性定位

相对于用户滚动进行定位

在relative和fixed之间切换，当滚动超出目标区域时转为fixed固定住位置

