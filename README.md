## 绘制飞线
* [曲线](https://stonerao.github.io/flyLine/demo/curve.html)
* [实线](https://stonerao.github.io/flyLine/demo/straight.html)
* [光点](https://stonerao.github.io/flyLine/demo/point.html)
* [贴图](https://stonerao.github.io/flyLine/demo/texture.html)

### 使用飞线
```javascript
let _Fly = new initFly({
    texture: "./xxx.png"//飞线贴图  如果不需要则不传递
});//初始化方法
//添加飞线
let flyMesh = _Fly.addFly({
    color: `rgba(255,0,0,1)`,
    curve: [],//飞线的路径  [{x,y,z},{x,y,z},{x,y,z}]  数组越大 飞线越密
    width: 9,//飞线的宽度 大小
    length: 150,//飞线的长度 
    speed: 1,//速度 越大越快
    repeat: 1 //重复次数  1-Infinity
})
scene.add(flyMesh); 

```
#### 删除
*repeat 循环次数完毕自动删除
```javascript
_Fly.remove(flyMesh); //手动删除  
```
#### 注意 
需要在 requestAnimationFrame 中 执行 _Fly.animation(delta);

### 生成路径
```
var points = _Fly.tranformPath(
    [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(100, 100, 100)
    ],
    1
);
```


#### 例子
```javascript
var time = setInterval(() => {
    if (index >= 4000) {
        clearInterval(time)
    }
    var x = 0;
    var z = 0;
    
    var x1 = THREE.Math.randFloat(-200, 200);
    var z1 = THREE.Math.randFloat(-200, 200);
    var curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, 0, z),
        new THREE.Vector3((x + x1) / 2, THREE.Math.randInt(200, 420), (z1 + z) / 2),
        new THREE.Vector3(x1, 0, z1)
    );
    var points = curve.getPoints(500);
    var flyMesh = _Fly.addFly({
        color: `rgba(${THREE.Math.randInt(0, 255)},${THREE.Math.randInt(0, 255)},255},1)`,
        curve: points,
        width: 9,
        length: 150,
        speed: 1,
        repeat: Infinity
    })
    scene.add(flyMesh);
    index++;
}) 
```

* 联系qq 674656681