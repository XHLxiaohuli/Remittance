export const compress=(img,Orientation)=>{
  console.log(img)
  console.log(Orientation)
    let canvas = document.createElement("canvas");  
      let ctx = canvas.getContext('2d');  
        //瓦片canvas  
      let tCanvas = document.createElement("canvas");  
      let tctx = tCanvas.getContext("2d");  
      let initSize = img.src.length;  
      let width = img.width;  
      let height = img.height;  
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
      let ratio;  
      if ((ratio = width * height / 4000000) > 1) {  
        ratio = Math.sqrt(ratio);  
        width /= ratio;  
        height /= ratio;  
      } else {  
        ratio = 1;  
      }  
      canvas.width = width;  
      canvas.height = height;  
  //        铺底色  
      ctx.fillStyle = "#fff";  
      ctx.fillRect(0, 0, canvas.width, canvas.height);  
      //如果图片像素大于100万则使用瓦片绘制  
      let count;  
      if ((count = width * height / 1000000) > 1) {  
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
  //            计算每块瓦片的宽和高  
        let nw = ~~(width / count);  
        let nh = ~~(height / count);  
        tCanvas.width = nw;  
        tCanvas.height = nh;  
        for (let i = 0; i < count; i++) {  
          for (let j = 0; j < count; j++) {  
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
          }  
        }  
      } else {  
        ctx.drawImage(img, 0, 0, width, height);  
      }  
      //修复ios上传图片的时候 被旋转的问题  
      if(Orientation != "" && Orientation != 1){  
        switch(Orientation){  
          case 6://需要顺时针（向左）90度旋转  
              this.rotateImg(img,'left',canvas);  
              break;  
          case 8://需要逆时针（向右）90度旋转  
              this.rotateImg(img,'right',canvas);  
              break;  
          case 3://需要180度旋转  
              this.rotateImg(img,'right',canvas);//转两次  
              this.rotateImg(img,'right',canvas);  
              break;  
        }  
      }  
      //进行最小压缩  
      let ndata = canvas.toDataURL('image/jpeg', 0.1);   
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
      return ndata;  
  }