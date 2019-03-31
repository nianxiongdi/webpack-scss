



Ubuntu安装:


 apt-get install ruby

sudo apt-get install ruby-dev

sudo gem install sass

运行 编译
开启“watch”功能，这样只要你的代码进行任保修改，都能自动监测到代码的变化，并且给你直接编译出来：
    sass --watch <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css    

sass --watch test.scss:test.css

单文件编译:
    sass <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css

多文件编译:
    上面的命令表示将项目中“sass”文件夹中所有“.scss”(“.sass”)文件编译成“.css”文件，并且将这些 CSS 文件都放在项目中“css”文件夹中。
    sass sass/:css/
 

查看版本 
sass -v

更新版本
gem update sass

卸载:
gem uninstall sass


Sass 的编译有多种方法：

    命令编译
    GUI工具编译
    自动化编译


在编译过程中使用utf-8,文件本身不要使用gbk
路径不要出现中文


在 Sass 中编译出来的样式风格也可以按不同的样式风格显示,其主要包括以下几种样式风格：

    nav {
        ul {
            margin: 0px;
            list-style: none;
        }
        
        li {display: inline-block;}

        a {
            display: block;
            padding: 6px 12px;
            text-decoration: none;
        }
    }

    嵌套输出方式 nested



sass --watch 01-nested.scss:test.css --style nested




    展开输出方式 expanded  
     sass --watch test.scss:test.css --style expanded
    区别在于'}',独占一行

    紧凑输出方式 compact 

    nav ul { margin: 0; padding: 0; list-style: none; }
    nav li { display: inline-block; }
    nav a { display: block; padding: 6px 12px; text-decoration: none; }

    压缩输出方式 compressed



## 声明变量

Sass 的变量包括三个部分
    1. 声明变量的符号“$”
    2. 变量名称
    3. 赋予变量的值

$withch: 200px;

##普通变量
    定义之后可以在全局范围内使用。
$fontSize: 12px;
body{
    font-size:$fontSize;
}

##默认变量
sass 的默认变量仅需要在值后面加上 !default 即可。

$baseLineHeight:1.5 !default;
body{
    line-height: $baseLineHeight; 
}

嵌套方式:
    选择器嵌套

<header>
<nav>
    <a href=“##”>Home</a>
    <a href=“##”>About</a>
    <a href=“##”>Blog</a>
</nav>
<header>

nav a {
  color:red;
}

header nav a {
  color:green;
}

nav {
  a {
    color: red;

    header & {
      color:green;
    }
  }  
}





    属性嵌套 

.box {
    border-top: 1px solid red;
    border-bottom: 1px solid green;
}


.box {
    border: { //这里用冒号
        top: 1px solid red;
        bottom:1px solid green;
    }
}
 

    伪类嵌套
需要借助`&`符号一起配合使用。


.clearfix{
&:before,
&:after {
    content:"";
    display: table;
  }
&:after {
    clear:both;
    overflow: hidden;
  }
}

clearfix:before, .clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  overflow: hidden;
}



混合宏-声明混合宏
目的- 如果你的整个网站中有几处小样式类似，比如颜色，字体等，在 Sass 可以使用变量来统一处理，那么这种选择还是不错的。但当你的样式变得越来越复杂，需要重复使用大段的样式时，使用变量就无法达到我们目了。这个时候 Sass 中的混合宏就会变得非常有意义。在这一节中，主要向大家介绍 Sass 的混合宏。

1、声明混合宏

不带参数混合宏：

在 Sass 中，使用“@mixin”来声明一个混合宏。如：

@mixin border-radius{
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
其中 @mixin 是用来声明混合宏的关键词，有点类似 CSS 中的 @media、@font-face 一样。border-radius 是混合宏的名称。大括号里面是复用的样式代码。

带参数混合宏：

除了声明一个不带参数的混合宏之外，还可以在定义混合宏时带有参数，如：

@mixin border-radius($radius:5px){
    -webkit-border-radius: $radius;
    border-radius: $radius;
}
复杂的混合宏：

上面是一个简单的定义混合宏的方法，当然， Sass 中的混合宏还提供更为复杂的，你可以在大括号里面写上带有逻辑关系，帮助更好的做你想做的事情,如：

@mixin box-shadow($shadow...) {
  @if length($shadow) >= 1 {
    @include prefixer(box-shadow, $shadow);
  } @else{
    $shadow:0 0 4px rgba(0,0,0,.3);
    @include prefixer(box-shadow, $shadow);
  }
}
这个 box-shadow 的混合宏，带有多个参数，这个时候可以使用“ … ”来替代。简单的解释一下，当 $shadow 的参数数量值大于或等于“ 1 ”时，表示有多个阴影值，反之调用默认的参数值“ 0 0 4px rgba(0,0,0,.3) ”。

注：复杂的混合宏中的逻辑关系（@if...@else）后面小节会有讲解。




混合宏-调用混合宏
 
使用 @include调用

@mixin border-radius {
    -webkit-border-radius: 3px;
    border-radius: 3px;
}

button {
    @include border-radius;
}

设置默认值:
@mixin border-radius($radius:3px){
  -webkit-border-radius: $radius;
  border-radius: $radius;
}
在混合宏“border-radius”传了一个参数“$radius”，而且给这个参数赋予了一个默认值“3px”。

在调用类似这样的混合宏时，会多有一个机会，假设你的页面中的圆角很多地方都是“3px”的圆角，那么这个时候只需要调用默认的混合宏“border-radius”:

.btn {
  @include border-radius;
}
编译出来的 CSS:

.btn {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}


继承  -  @extend

.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-second {
  background-color: orange;
  color: #fff;
  @extend .btn;
}


//CSS
.btn, .btn-primary, .btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-second {
  background-clor: orange;
  color: #fff;
}


###插值 #{}

## palace 占位符 - %

//定义一个占位符

%mt5 {
  margin-top: 5px;
}

/*调用一个占位符*/

.box {
  @extend %mt5;
}


## 数据类型
 Sass 和 JavaScript 语言类似，也具有自己的数据类型，在 Sass 中包含以下几种数据类型：

 数字: 如，1、 2、 13、 10px；
 字符串：有引号字符串或无引号字符串，如，"foo"、 'bar'、 baz； sans-serifbold
 颜色：如，blue、 #04a3f9、 rgba(255,0,0,0.5)；
 布尔型：如，true、 false；
 空值：如，null；
 值列表：用空格或者逗号分开，如，1.5em 1em 0 2em 、 Helvetica, Arial, sans-serif。
    margin: 10px 15px 0 0
    或者： 
    font-face: Helvetica, Arial, sans-serif


SassScript 也支持其他 CSS 属性值（property value），比如 Unicode 范围，或 !important 声明。然而，Sass 不会特殊对待这些属性值，一律视为无引号字符串 (unquoted strings)。

p {
  font: 10px/8px;             // 纯 CSS，不是除法运算
  $width: 1000px;
  width: $width/2;            // 使用了变量，是除法运算
  width: round(1.5)/2;        // 使用了函数，是除法运算
  height: (500px/2);          // 使用了圆括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加（+）号，是除法运算
}


.box {
  width: 100px / 2;  
}
编译出来的 CSS 如下：

.box {
  width: 100px / 2;
}
这样的结果对于大家来说没有任何意义。要修正这个问题，只需要给运算的外面添加一个小括号( )即可：

.box {
  width: (100px / 2);  
}
编译出来的 CSS 如下：

.box {
  width: 50px;
}