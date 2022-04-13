//IIFE(즉시실행함수 표현식)
;(function($, window, document, undefined){ //매개변수
    // ECMA Script 5 (이크마 스크립트 5)
    //객체

    var mall = {
        init:       function(){ //메서드(리터럴함수)
            this.smoothScrollFn();
            this.headerFn();
            this.section1Fn();
            this.section1BtnFn();
            //this.section2Fn();
          
    
        },
        smoothScrollFn: function(){ //전체 공용 함수 스무스 스크롤링 이벤트 함수
            var $smoothBtn  = $('.smoothBtn');
            var $htmlBody   = $('html,body');
            

                $smoothBtn.on({
                    click:  function(event){
                        event.preventDefault();
                        $this = $(this); //현재 클릭한 이(this) 버튼

                        var url = $this.attr('href'); 
						if(url !== undefined && url != ''){
	                        $htmlBody.stop().animate({scrollTop:$( url ).offset().top-60},800,'easeInOutCirc');
	                       
						}
                    }
                });

        },            
        headerFn:   function(){

            //헤더영역 스크롤 이벤트 (페럴럭스)
            var $window     = $(window);
            var $header     = $('#header');
            // var $appBtn     = $('.appBtn');
            // var $mobileBtn  = $('.mobileBtn');
            // var $mobile     = $('.mobile');

                
                //마우스로 스크롤값이 아래로 30픽셀이상 >= 내려가면 
                //선택자 헤더영역(#header)에 효과 이벤트가 발생하게 하라 
                $window.scroll(function(){ //스크롤 이벤트
                    console.log(  $window.scrollTop() ); //스크롤 탑값 확인
                    if( $window.scrollTop() >= 30 ){  //마우스로 스크롤값이 아래로 30픽셀이상 내려가면
                        $header.addClass('addHeader');  //헤더에 클래스 추가
                       // $appBtn.animate({left :'0px',right: '0px',bottom:'0px',borderRadius: '0px'},.1);
                    }
                    else{
                        $header.removeClass('addHeader'); //추가된 클래스 삭제
                       // $appBtn.animate({left :'30px',right: '30px',bottom:'54px',borderRadius: '6px'},.1);  
                    }           
                });

                //모바일 버튼 클릭 이벤트
               //  $mobileBtn.on({
               //      click:  function(){
               //          $mobile.stop().slideToggle(300);
               //      }
               //  });


                //모바일 메뉴가 노출된경우 
                //창너비가 980 초과이면 slideUp() 강제로 안보이게 처리한다.
               //  function resizeFn(){
               //      if( $window.innerWidth() > 980  ){
               //          $mobile.stop().slideUp(0);
               //      }
               //  }
                    
               //  setTimeout(resizeFn,100); //로딩시

               //  $window.resize(function(){ //창크기 변경시
               //      resizeFn();
               //  });

            },
            section1Fn:  function(){

                const slideWrap      = $('#section1 .slide-wrap');
                const slideContainer = $('#section1 .slide-container');
                let   cnt            = 0;
                let   setId          = 0;
                let   setId2         = 0;
                let   swipeStart     = null;
                let   swipeEnd       = null;
                let   count          = 0;
    
                let   dragStart      = null; // 슬라이드 마지막이 처음에서 왼쪽으로 이동된 상태 값을 빼주고 시작
                let   dragEnd        = null; 
                let   mouseDown      = null; // 반드시 마우스가 다우된 상태를판단 다운이면 tru, 업이면 false
    
    
    
                //1.메인슬라이드 함수
                function mainSlide(){   
                    // slideWrap.stop().animate({left:(-100*cnt) + '%'});       
                   slideWrap.stop().animate( {left:(-330*cnt)},600, 'easeInOutExpo',function(){
                      if(cnt>2){cnt=0}  //다음슬라이드 롤링
                      if(cnt<0){cnt=2}  //이전슬라이드 롤링
                      slideWrap.stop().animate( {left:(-330*cnt)},0)
                   });
                }
    
                //2.다음카운트 함수
                function nextCount(){
                   cnt++;
                   mainSlide();
                }
                //2.이전카운트 함수
                function prevCount(){
                   cnt--;
                   mainSlide();
                }
                //3.자동타이머 함수
                function autoTimer(){
                   setId = setInterval(nextCount, 3000);  //함수호출하고 3초 후에 실행
                   //console.log('setId', setId);
                }
    
                autoTimer();
                
                //4. 마우스 터치 스와이프
                slideContainer.on({
                      mousedown: function(event){
                         //터치스와이프 시작 포지션
                         swipeStart = event.clientX;
    
                         dragStart  = event.clientX - slideWrap.offset().left - 330;
                         mouseDown  = true;//드래그 시작임을 표시
                         timerCount(); //터치시작하면 타이머 카운트 실행
    
                      },//mousedown 끝
                      mouseup: function(event){
                         swipeEnd = event.clientX;
                         mouseDown  = false; //드래그 끝
                         if( swipeStart-swipeEnd > 0 ){//다음슬라이드                     
                            nextCount();
                         }
                         if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                    
                            prevCount();
                      }
                  
                   },// mouseup 끝
                   mousemove: function(event){//마우스무브
                      //console.log(event);
                      // 반드시 마우스를 다운한 상태가 아니면 종료(리턴)시켜라
                      // if(mouseDown !== true){
                      // if(mouseDown == null){초기값을 null 지정해야한다.
                      // if(mouseDown == false){초기값을 false 지정해야한다.
                      if(!mouseDown){ //true가 아니면
                         return;
                      }
                      dragEnd  = event.clientX; //마우스가 움직이면 계속 드래그된다.
                      // 이동거리는 = dragEnd - dragStart;
                      slideWrap.css({left: dragEnd - dragStart })
                   },
                   mouseleave: function(event){ 
                         if(!mouseDown){return}
                         swipeEnd = event.clientX;
                         mouseDown  = false; //드래그 끝
                         if( swipeStart-swipeEnd > 0 ){//다음슬라이드                       
                            nextCount();
                         }
                         if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                        
                            prevCount();
                         }
                    
                   }
                });
                //4-2. 타이머를 컨트롤 타이머 만들어서 5초 동안 터치가 없으면 다시
                // 타이머카운트함수 : 마우스 터치시에 슬라이드 정지시키고
                //                   카운트 동작 5초간 터치가 없으면 다시
                //                   다음 슬라이드 자동타이머 동작 알고리즘
                // 타이머카운트함수
                function timerCount(){
                   clearInterval(setId); // setId 중지
                   clearInterval(setId2); // setId2 중지
                      count  = 0;         // 초기화 다시 카운트
                      setId2 = setInterval(function(){
                         count++;          // 증가변수는 반드시 초기값 설정                        
                         if(count>5){      // 5초간 터치가 없으면 
                            nextCount();   // 다음슬라이드 호출 실행
                            autoTimer();   // 자동타이머 딱한번 호출하면 3초후 무한반복
                            clearInterval(setId2);// 나 setId2자신을 중지시켜라
                         }
                      }, 1000);   // 자동타이머가 중지되면 카운트가 1초에 1회씩 증가
                      
                   
                   }//
                
                //5. 마우스 드레그 앤 드롭
                // mousemove
    
                //6. 반응형 모바일 손가락 핑거 드래드 앤 드롭(반응형)
                // 마우스 인식못함 동작안함
                // 반응형 진행하고 폴리필 touchEvent 추가
                // touchstart(mousedown) / touchend(mouseup) / touchmove(mousemove)
                slideContainer.on({

                   
                   touchstart: function(event){
                      swipeStart = event.originalEvent.touches[0].clientX;
                      dragStart  = event.originalEvent.touches[0].clientX - slideWrap.offset().left - 330;
                      mouseDown  = true;//드래그 시작임을 표시  
                      timerCount(); //터치시작하면 타이머 카운트 실행
                   },
                   touchend: function(event){
                     
                         swipeEnd   = event.originalEvent.changedTouches[0].clientX;   
                         mouseDown  = false; //드래그 끝   
                         if( swipeStart-swipeEnd > 0 ){//다음슬라이드                     
                            nextCount();
                         }
                         if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                    
                            prevCount();
                         }   
    
                   },
                   touchmove: function(event){                 
                      if(!mouseDown){ //true가 아니면
                         return;
                      }
                      dragEnd  = event.originalEvent.touches[0].clientX; //마우스가 움직이면 계속 드래그된다.
                      // 이동거리는 = dragEnd - dragStart;
                      slideWrap.css({left: dragEnd - dragStart })
                   }
                });
    
             },
             section1BtnFn:  function(){
 
                 const btnWrap      = $('#section1 .btn-wrap');
                 const btnContainer = $('#section1 .btn-container');
                 let   cnt            = 0;
                 let   swipeStart     = null;
                 let   swipeEnd       = null;
                 let   dragStart      = null; // 슬라이드 마지막이 처음에서 왼쪽으로 이동된 상태 값을 빼주고 시작
                 
                 let   mouseDown      = null; // 반드시 마우스가 다우된 상태를판단 다운이면 tru, 업이면 false
     
     
     
                 //1.메인슬라이드 함수
                 function mainSlide(){   
                     // btnWrap.stop().animate({left:(-100*cnt) + '%'});       
                    btnWrap.stop().animate( {left:(-80*cnt)}, 'easeInOutSine',function(){
                       
                       btnWrap.stop().animate( {left:(-80*cnt)})
                    });
                 }
     
                 //2.다음카운트 함수
                 function nextCount(){
                    cnt++;
                    mainSlide();
                 }
                 //2.이전카운트 함수
                 function prevCount(){
                    cnt--;
                    mainSlide();
                 }
                
                 
                 //4. 마우스 터치 스와이프
                 btnContainer.on({
                       mousedown: function(event){
                          //터치스와이프 시작 포지션
                          swipeStart = event.clientX;
     
                          dragStart  = event.clientX - btnWrap.offset().left - 80;
                          mouseDown  = true;//드래그 시작임을 표시
                         
     
                       },//mousedown 끝
                       mouseup: function(event){
                          swipeEnd = event.clientX;
                          mouseDown  = false; //드래그 끝
                          if( swipeStart-swipeEnd > 0 ){//다음슬라이드                     
                             nextCount();
                          }
                          if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                    
                             prevCount();
                       }
                   
                    }
                 });
                
                 //5. 마우스 드레그 앤 드롭
                 // mousemove
     
                 //6. 반응형 모바일 손가락 핑거 드래드 앤 드롭(반응형)
                 // 마우스 인식못함 동작안함
                 // 반응형 진행하고 폴리필 touchEvent 추가
                 // touchstart(mousedown) / touchend(mouseup) / touchmove(mousemove)
                 btnContainer.on({
 
                    
                    touchstart: function(event){
                       swipeStart = event.originalEvent.touches[0].clientX;
                       dragStart  = event.originalEvent.touches[0].clientX - btnWrap.offset().left - 80;
                       mouseDown  = true;//드래그 시작임을 표시  
                      
                    },
                    touchend: function(event){
                      
                          swipeEnd   = event.originalEvent.changedTouches[0].clientX;   
                          mouseDown  = false; //드래그 끝   
                          if( swipeStart-swipeEnd > 0 ){//다음슬라이드                     
                             nextCount();
                          }
                          if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                    
                             prevCount();
                          }   
     
                    }
                 });
     
              },
             section2Fn:  function(){

               const slideWrap      = $('#section2 .sec2-slide-wrap');
               const slideContainer = $('#section2 .sec2-slide-container');
               let   cnt            = 0;
               let   setId          = 0;
               let   setId2         = 0;
               let   swipeStart     = null;
               let   swipeEnd       = null;
               let   count          = 0;
   
               let   dragStart      = null; // 슬라이드 마지막이 처음에서 왼쪽으로 이동된 상태 값을 빼주고 시작
               let   dragEnd        = null; 
               let   mouseDown      = null; // 반드시 마우스가 다우된 상태를판단 다운이면 tru, 업이면 false
   
   
   
               //1.메인슬라이드 함수
               function mainSlide(){   
                   // slideWrap.stop().animate({left:(-100*cnt) + '%'});       
                  slideWrap.stop().animate( {left:(-330*cnt)},600, 'easeInOutExpo',function(){
                     if(cnt>2){cnt=0}  //다음슬라이드 롤링
                     if(cnt<0){cnt=2}  //이전슬라이드 롤링
                     slideWrap.stop().animate( {left:(-330*cnt)},0)
                  });
               }
   
               //2.다음카운트 함수
               function nextCount(){
                  cnt++;
                  mainSlide();
               }
               //2.이전카운트 함수
               function prevCount(){
                  cnt--;
                  mainSlide();
               }
               //3.자동타이머 함수
               function autoTimer(){
                  setId = setInterval(nextCount, 3000);  //함수호출하고 3초 후에 실행
                  //console.log('setId', setId);
               }
   
               autoTimer();
               
               //4. 마우스 터치 스와이프
               slideContainer.on({
                     mousedown: function(event){
                        //터치스와이프 시작 포지션
                        swipeStart = event.clientX;
   
                        dragStart  = event.clientX - slideWrap.offset().left - 330;
                        mouseDown  = true;//드래그 시작임을 표시
                        timerCount(); //터치시작하면 타이머 카운트 실행
   
                     },//mousedown 끝
                     mouseup: function(event){
                        swipeEnd = event.clientX;
                        mouseDown  = false; //드래그 끝
                        if( swipeStart-swipeEnd > 0 ){//다음슬라이드                     
                           nextCount();
                        }
                        if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                    
                           prevCount();
                     }
                 
                  },// mouseup 끝
                  mousemove: function(event){//마우스무브
                     //console.log(event);
                     // 반드시 마우스를 다운한 상태가 아니면 종료(리턴)시켜라
                     // if(mouseDown !== true){
                     // if(mouseDown == null){초기값을 null 지정해야한다.
                     // if(mouseDown == false){초기값을 false 지정해야한다.
                     if(!mouseDown){ //true가 아니면
                        return;
                     }
                     dragEnd  = event.clientX; //마우스가 움직이면 계속 드래그된다.
                     // 이동거리는 = dragEnd - dragStart;
                     slideWrap.css({left: dragEnd - dragStart })
                  },
                  mouseleave: function(event){ 
                        if(!mouseDown){return}
                        swipeEnd = event.clientX;
                        mouseDown  = false; //드래그 끝
                        if( swipeStart-swipeEnd > 0 ){//다음슬라이드                       
                           nextCount();
                        }
                        if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                        
                           prevCount();
                        }
                   
                  }
               });
               //4-2. 타이머를 컨트롤 타이머 만들어서 5초 동안 터치가 없으면 다시
               // 타이머카운트함수 : 마우스 터치시에 슬라이드 정지시키고
               //                   카운트 동작 5초간 터치가 없으면 다시
               //                   다음 슬라이드 자동타이머 동작 알고리즘
               // 타이머카운트함수
               function timerCount(){
                  clearInterval(setId); // setId 중지
                  clearInterval(setId2); // setId2 중지
                     count  = 0;         // 초기화 다시 카운트
                     setId2 = setInterval(function(){
                        count++;          // 증가변수는 반드시 초기값 설정                        
                        if(count>5){      // 5초간 터치가 없으면 
                           nextCount();   // 다음슬라이드 호출 실행
                           autoTimer();   // 자동타이머 딱한번 호출하면 3초후 무한반복
                           clearInterval(setId2);// 나 setId2자신을 중지시켜라
                        }
                     }, 1000);   // 자동타이머가 중지되면 카운트가 1초에 1회씩 증가
                     
                  
                  }//
               
               //5. 마우스 드레그 앤 드롭
               // mousemove
   
               //6. 반응형 모바일 손가락 핑거 드래드 앤 드롭(반응형)
               // 마우스 인식못함 동작안함
               // 반응형 진행하고 폴리필 touchEvent 추가
               // touchstart(mousedown) / touchend(mouseup) / touchmove(mousemove)
               slideContainer.on({

                  
                  touchstart: function(event){
                     swipeStart = event.originalEvent.touches[0].clientX;
                     dragStart  = event.originalEvent.touches[0].clientX - slideWrap.offset().left - 330;
                     mouseDown  = true;//드래그 시작임을 표시  
                     timerCount(); //터치시작하면 타이머 카운트 실행
                  },
                  touchend: function(event){
                    
                        swipeEnd   = event.originalEvent.changedTouches[0].clientX;   
                        mouseDown  = false; //드래그 끝   
                        if( swipeStart-swipeEnd > 0 ){//다음슬라이드                     
                           nextCount();
                        }
                        if( swipeStart-swipeEnd < 0 ){   // 이전슬라이드                    
                           prevCount();
                        }   
   
                  },
                  touchmove: function(event){                 
                     if(!mouseDown){ //true가 아니면
                        return;
                     }
                     dragEnd  = event.originalEvent.touches[0].clientX; //마우스가 움직이면 계속 드래그된다.
                     // 이동거리는 = dragEnd - dragStart;
                     slideWrap.css({left: dragEnd - dragStart })
                  }
               });
   
            }
      


       

    };  //객체 끝


    //객체.메서드 실행
    mall.init(); //초기실행함수


})(jQuery, window, document); //아규먼트
