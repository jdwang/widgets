
// input text 不為空
function validateBlank(elem){
	var flag = true;
	elem.each(function(){
		var _self = $(this);
		if(_self.val() == ""){
			errorTips(_self,_self.parent().prev().text()+'不能為空');
			flag = false;
		}
	})
	return flag
}
// 姓名
function validateName(elem){
	var valsize = elem.val().length;
	if(valsize>=2&&valsize<=30){
		return true
	}else{
		errorTips(elem,'請輸入2-30個字符')
		return false
	}
}
// 身份證
function validateId(elem){
	var code = elem.val();
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    if(!pass){
    	errorTips(elem,'請輸入正確的身份證號');
    }
    return pass;
}
// 驗證郵箱
function validateEmail(elem){
	 var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
		val = elem.val(),
		flag = reg.test(val);
	 if(!flag){
	 	errorTips(elem,'請輸入正確的email');
	 }
   	 return reg.test(val);
}
// 驗證電話
function validatePhone(elem){
	var reg = /^(13|14|15|16|17|18|19)\d{9}$/,
		val = elem.val(),
		flag = reg.test(val);
	if(!flag){
	 	errorTips(elem,'請輸入正確的電話號碼');
	 }
	 return reg.test(val);
}
//錯誤提示文本
function errorTips(elem,text){
	if(elem.parent().find('.error-tips').length==0){				
		elem.parent().append('<div class="error-tips error-tips-show">'+text+'</div>');
	}else{
		elem.parent().find('.error-tips').text(text).addClass('error-tips-show');
	}
}
// 图片上传预览
function previewFile(e,img) {
	var file    = e.target.files[0];
	var reader  = new FileReader();
	reader.onloadend = function () {
		img.attr('src',reader.result)
	}
	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}
// 图片上传大小验证
function validateThumSize(size) {
	if (size > 10) {
		alert('上传图片不能大于10MB');
		return false
	}else{
		return true
	}
	
}

function bindEvent(){
	// 图片上传
	$('.input-upload').on("change",function(e){
		if(!this.files[0]){
			return
		}
		if(validateThumSize(this.files[0].size/1024/1024)){
			previewFile(e,$(this).parent().find('img'));
		}
		
	})
	// 点击保存按钮
	$('.c-save').on('click',function(e){
		e.preventDefault();
		var flag = true,
			validateArray = [];
		$('.error-tips').removeClass('error-tips-show');
		// 判斷input text是否為空
		validateArray.push(validateBlank($('.input-modify')));
		// 判斷名字
		validateArray.push(validateName($('#userNameInput')));
		// 判斷英文名字
		validateArray.push(validateName($('#userNameEnInput')));
		// 判斷身份證
		validateArray.push(validateId($('#userIdInput')));
		// 判斷email
		validateArray.push(validateEmail($('#userEmailInput')));
		// 判斷電話
		validateArray.push(validatePhone($('#userPhoneInput')));
		//
		$.each(validateArray,function(i,val){
			if(!val){
				flag = false;
			}
		})

		if(flag){
			$('#xinxixiugaiForm').submit();
		}else{
			window.scrollTo(0,0)
		}

	})
}
function init(){
	bindEvent();
}
init();


// 压缩图片
// function resizeMe(img) {
// 	var max_width = 360;
// 	var canvas = document.createElement('canvas');

// 	var width = img.width;
// 	var height = img.height;

// 	// calculate the width and height, constraining the proportions
// 	if (width > height) {
// 		if (width > max_width) {
// 		  //height *= max_width / width;
// 		  height = Math.round(height *= max_width / width);
// 		  width = max_width;
// 		}
// 	} else {
// 	if (height > max_height) {
// 	  //width *= max_height / height;
// 	  width = Math.round(width *= max_height / height);
// 	  height = max_height;
// 	}
// 	}

// 	// resize the canvas and draw the image data into it
// 	canvas.width = width;
// 	canvas.height = height;
// 	var ctx = canvas.getContext("2d");
// 	ctx.drawImage(img, 0, 0, width, height);

// 	preview.appendChild(canvas); // do the actual resized preview

// 	return canvas.toDataURL("image/jpeg",0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)

// }