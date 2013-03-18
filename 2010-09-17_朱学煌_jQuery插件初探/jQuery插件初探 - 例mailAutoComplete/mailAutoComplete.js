/**
 * Created by xiaomipig at 2010-09-16
 */
(function($) {
    $.fn.mailAutoComplete = function(options) {
        var defaults = {
            'mailArray' : ['@qq.com', '@163.com', '@126.com', '@111.com', '@122.com', '@sina.com.cn', '@sohu.com', '@gmail.com']
        };
		
		var settings = $.extend({}, defaults, options);
		/*$.each(settings, function(k, v) {
			alert(v);
		});*/
		
		//��������
		Array.prototype.clone = function(){ return this.slice(0); } 		
		
		var currIndex = 0,	//�������ʼֵ
			autoHide = false,	//�ж��Ƿ��������
			ulArray = settings.mailArray;	//Ĭ�������б�ĳ���

		//�����ʼ��б�
		var createMailList = function (txtValue, mailArray) {
			var mailListHtml = '<ul class="mailList"><li class="gray">��ѡ����������</li>';
			if (/@/.test(txtValue)) {
				var txtArray = txtValue.split('@');		//�۷��ı����е��ı�
				var replaceStr = '@' + txtArray[1];		//������ʽ���ַ���
				var mailArrayClone = mailArray.clone();		//���ƴ��ݵ���������
				var mailReg = new RegExp(replaceStr, 'i');		//�½�����
				//alert(mailReg);
				ulArray = [];	//��ʼ��Ϊ������				
				$.each(mailArrayClone, function(k, v) {
					var ii = mailReg.test(mailArrayClone[k]);	//����ƥ��
					//alert(ii);
					if (ii) {				
						mailArrayClone[k] = mailArrayClone[k].replace(replaceStr, '');		//��ƥ����ַ����滻�ɿ��ַ�
						//alert(mailArray[k]);
						mailListHtml += '<li><span class="red">'+ txtValue +'</span>' + mailArrayClone[k] + '</li>';	//����li
						ulArray.push(mailArrayClone[k]);	//���ulArray����
					}		
				});
				//����ƥ��ֵ���������ӣ�currIndex ��Ӧ�ļ�С
				if (currIndex > ulArray.length) {
					currIndex = 0;	
				}		
				//alert(ulArray.toString());
				//alert(mailArrayClone.toString());
				//alert(mailArray.toString());
			} else {
				$.each(mailArray, function(k, v) {
					mailListHtml += '<li><span class="red">'+ txtValue +'</span>' + mailArray[k] + '</li>';
				});	
			}			
			mailListHtml += '</ul>';
			//alert(mailListHtml);			
			return mailListHtml;	//���������б�
		};
		//�Ƴ��ʼ��б�
		var removeMailList = function(bool) {
			autoHide = bool || false;
			if (autoHide) {
				$('.mailList').remove();
			}				
		}; 
		//���̷�����¼�
		var keyCode = function(that, e) {
			var liLength = ulArray.length;
			//alert('currIndex - ' + currIndex);
			//alert('liLength - ' + liLength);
			if (e.keyCode === 37 || e.keyCode === 38) {
				//alert('��/��');
				if (currIndex === 1) {
					currIndex = liLength;
				} else if (currIndex > 0 && currIndex <= liLength) {
					currIndex--;
				}
				//alert(currIndex);
				$('.mailList li:eq(' + currIndex + ')').addClass('hover');						
			} else if (e.keyCode === 39 || e.keyCode === 40) {
				//alert('��/��');
				if (currIndex === liLength) {
					currIndex = 1;
				} else if (currIndex >= 0 && currIndex < liLength) {
					currIndex++;
				}
				//alert(currIndex);
				$('.mailList li:eq(' + currIndex + ')').addClass('hover');	
			} else if (e.keyCode === 13) {
				//alert('Enter');
				//alert(currIndex);	
				var currText = $('.mailList li:eq(' + currIndex + ')').text();
				that.val(currText);
				removeMailList(true);
			}
		};
		//����ƶ��͵���¼�
		var hover = function(that) {
			$('.mailList li:gt(0)').mouseover(function() {
				$(this).addClass('hover')	;
			}).mouseout(function() {
				$(this).removeClass('hover');
			}).click(function() {
				var txt = $(this).text();
				$(that).val(txt);
				removeMailList(true);
			});
		};		
		
		this.each(function () {
			$(this).keyup(function(e) {
				var value = $.trim($(this).val());				
				var that = $(this);	//��ǰ�ı������ָ��that����
				if (value.length > 0) {
					var mailList = createMailList(value, settings.mailArray);	//��������html
					$(this).parent().attr('class', 'relative');	//�ø�Ԫ����Զ�λ
					$(this).next().remove();	//�Ƴ������б�
					$(this).after(mailList);	//���������б�
					hover(that);	//����ƶ�Ч��
					keyCode(that, e);	//�����¼�					
				}
				if (ulArray.toString() === '') {
					$('.mailList').remove();	//�Ƴ������б�
				}				
			}).blur(function() {
				//autoHide = true;
				if (autoHide) {
					$(this).next().remove();	//�Ƴ������б�
					autoHide = false;	
				}					
			});
		});
    };   
})(jQuery);