var game,domain="https://rpc.eu.booming-games.com",list_of_games=domain+"/marketing/pages/demo-links",game_metadata_e1=domain+"/games/metadata/get",game_metadata_e3=domain+"/e3/games/metadata/get",TAG="TAG",agg_tags=domain+"/liquor_cabinet/game_tags/aggregate",FEATURE="FEATURE",agg_features=domain+"/liquor_cabinet/game_features/aggregate",VOLATILITY="VOLATILITY",agg_volatilities=domain+"/liquor_cabinet/game_volatilities/aggregate",isMobile=window.innerWidth<600,re_s1=new RegExp(" ","g"),re_s2=new RegExp(",","g"),fill_in_gamedata=function(e,a){var s=a.reduce(function(e,a){return e[a.game_id]=a,e},{});$.each(e,function(e,a){var i=s[a];game={game_id:i.game_id,game_name:i.title_name,game_grid:i.grid_description,game_paylines:i.paylines_description,game_volatility:i.volatility,game_features:i.features.join(", "),game_themes:i.tags.join(", ")},isMobile?(game.game_link="https://operator.eu.booming-games.com/promotion/play/"+i.game_id+"/mobile/demo-links/en",isE3(i)?game.game_asset="https://engine.eu.booming-games.com/assets/"+i.logo_mobile:game.game_asset="https://games.eu.booming-games.com/metadata_files/"+i.game_id+"/logo_mobile.png"):(game.game_link="https://operator.eu.booming-games.com/promotion/play/"+i.game_id+"/desktop/demo-links/en",isE3(i)?game.game_asset="https://engine.eu.booming-games.com/assets/"+i.logo:game.game_asset="https://games.eu.booming-games.com/metadata_files/"+i.game_id+"/logo.png"),$("div#container").append('<span class="game-box '+game.game_grid+" "+game.game_paylines+" "+game.game_features.replace(/['+]/g,"").replace(re_s1,"").replace(re_s2," ")+" "+game.game_themes.replace(re_s1,"").replace(re_s2," ")+" "+game.game_volatility.toLowerCase()+" "+game.game_name.replace(re_s1,"").replace(re_s2," ").toLowerCase()+' "> <img src="'+game.game_asset+'" alt=""/><a href="'+game.game_link+'" target="_blank" class="game-link"></a><div class="game-details"><div class="game-details-inner"><span class="label">Name: </span><span>'+game.game_name+'</span><br/><span class="label">Grid: </span><span>'+game.game_grid+'</span><br/><span class="label">Paylines: </span><span>'+game.game_paylines+'</span><br/><span class="label">Volatility: </span><span>'+game.game_volatility+'</span><br/><span class="label">Features: </span><span>'+game.game_features+'</span><span class="title">'+game.game_name+'</span></div></div><a href="" class="icon-details"><span class="icon-plus"></span></a></span>')})},fill_in_filters=function(e,s){s!=VOLATILITY&&e.data.sort(function(e,a){var i=e.code.toLowerCase(),s=a.code.toLowerCase();return i<s?-1:s<i?1:0}),$.each(e.data,function(e,a){switch(s){case TAG:$("[data-group='themes']").append('<div><input type="checkbox" class="checkbox" value=".'+a.en.name.replace(re_s1,"").replace(re_s2," ").toUpperCase()+'" id="'+a.en.name.replace(re_s1,"").replace(re_s2," ")+'"/><label for="'+a.en.name.replace(re_s1,"").replace(re_s2," ")+'">'+a.en.name+"</label></div>");break;case FEATURE:var i=a.en.name.replace(/['+]/g,"").replace(re_s1,"").replace(re_s2," ");$("[data-group='feature']").append('<div><input type="checkbox" class="checkbox" value=".'+i+'" id="'+i+'"/><label for="'+i+'">'+a.en.name+"</label></div>");break;case VOLATILITY:$("[data-group='volatility']").append('<div><input type="checkbox" class="checkbox volatility_solo" value=".'+a.en.name.replace(re_s1,"").replace(re_s2," ").toLowerCase()+'" id="'+a.en.name.replace(re_s1,"").replace(re_s2," ")+'"/><label for="'+a.en.name.replace(re_s1,"").replace(re_s2," ")+'">'+a.en.name+"</label></div>")}})},a_all_games=$.ajax({url:list_of_games,type:"GET",crossDomain:!0,dataType:"json"}),a_e1_metadata=function(e){return $.ajax({url:game_metadata_e1,type:"POST",crossDomain:!0,data:JSON.stringify({game_ids:e.data.game_ids}),dataType:"json"})},a_e3_metadata={data:[]},a_agg=function(e,a){return $.ajax({url:e,type:"GET",crossDomain:!0,dataType:"json"})},isE3=function(e){return!e.files};function init_gamesFilters(){var e=$("#options input"),a=$("#container");a.isotope({itemSelector:".game-box"}),a.imagesLoaded().progress(function(){a.isotope("layout")});var i,s,t,o=$("#quicksearch").keyup((i=function(){var s=[];e.filter(":checked").each(function(){s.push(this.value)}),s=s.join(""),a.isotope({filter:function(){var e=!0,a=$(this),i=o.val();return""!=i&&(qsRegex=new RegExp(i,"gi"),e=null!=$(this).find(".title").text().match(qsRegex)),0<s.length&&(null==e||1==e)&&(e=a.is(s)),e}})},s=200,function(){t&&clearTimeout(t),t=setTimeout(function(){i(),t=null},s||100)}));e.change(function(){1<$("input:checkbox.checkbox.grid_solo:checked").length&&($("input:checkbox.checkbox.grid_solo:checked").prop("checked",!1),$("#"+this.id).prop("checked",!0)),1<$("input:checkbox.checkbox.payline_solo:checked").length&&($("input:checkbox.checkbox.payline_solo:checked").prop("checked",!1),$("#"+this.id).prop("checked",!0)),1<$("input:checkbox.checkbox.volatility_solo:checked").length&&($("input:checkbox.checkbox.volatility_solo:checked").prop("checked",!1),$("#"+this.id).prop("checked",!0));var s=[];e.filter(":checked").each(function(){s.push(this.value)}),o.val(),s=s.join(""),a.isotope({filter:function(){var e=!0,a=$(this),i=o.val();return""!=i&&(qsRegex=new RegExp(i,"gi"),e=null!=$(this).find(".title").text().match(qsRegex)),0<s.length&&(null==e||1==e)&&(e=a.is(s)),e}})}),$("#resetFilters, .btn-reset").on("click touched",function(){({}),a.isotope({filter:"*"}),o.val(""),e.prop("checked",!1)})}function init_filters_UI(){$(".option-set").slideUp(),$(document).on("click touchend",".filter-link",function(e){e.preventDefault(),$(this).toggleClass("open").siblings(".option-set").slideToggle()}),$(document).on("click touchend",".icon-details",function(e){e.preventDefault(),$(this).children(".icon-plus").toggleClass("rotate"),$(this).siblings(".game-details").toggleClass("visible")})}function hideLoader(){$(".loader-wrapper").hide(),$(".filters-games").addClass("loaded")}function displayEmail(e,a){return"<a href='#' class='email' onclick='this.href=\"mailto:\" + atob(\""+e+'") + '+(a?'"?subject="'+a+'"':'""')+"' target='_blank'>"+atob(e)+"</a>"}$(document).ready(function(o){var e=!1,a=window.location.pathname;0<a.indexOf("games.html")?e=!0:a.indexOf("careers.html"),project_nameModule={init:function(){this.header(),this.initSliderHome(),this.initSliderNews(),this.viewLogos(),this.mobileNav(),this.openPositionsFilters(),this.openPositionsAccordion(),this.youtube(),this.initScrollReveal(),this.formValidation(),this.cookies(),e?(this.initSliderGames(),this.initGames(),this.mobileGamesFilters()):hideLoader()},header:function(){o(document).on("scroll",function(){100<o(document).scrollTop()?o(".header").addClass("narrow"):o(".header").removeClass("narrow")})},initSliderHome:function(){o(".js-slider-home").slick({dots:!0,autoplay:!0,infinite:!0,speed:1e3,slidesToShow:1,slidesToScroll:1})},initSliderGames:function(){o(".js-slider-games").slick({infinite:!0,autoplay:!0,slidesToShow:3,slidesToScroll:3,prevArrow:'<div class="prev-slide"><img src="images/icons/arrow-l.svg" alt=""></div>',nextArrow:'<div class="next-slide"><img src="images/icons/arrow-r.svg" alt=""></div>',responsive:[{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:1e3,settings:{slidesToShow:2,slidesToScroll:2}}]})},mobileNav:function(){o(".js-menu-toggler").on("click touchend",function(e){e.preventDefault(),o(this).toggleClass("open"),o("body").toggleClass("no-scroll"),o(".mobile-nav").slideToggle()})},initSliderNews:function(){var i=1100;o(".js-slider-news").on("init",function(e,a){window.innerWidth<660?maxPages=Math.ceil(a.slideCount):window.innerWidth<=i&&660<=window.innerWidth?maxPages=Math.ceil(a.slideCount/2):maxPages=Math.ceil(a.slideCount/3),o(".slider-paging-number li").append(" / "+maxPages)}),o(".js-slider-news").slick({infinite:!1,slide:".slide-news",prevArrow:o(".prev-slide"),nextArrow:o(".next-slide"),dots:!0,slidesToShow:3,slidesToScroll:3,appendDots:o(".pagination"),dotsClass:"slider-paging-number",responsive:[{breakpoint:660,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:i,settings:{slidesToShow:2,slidesToScroll:2}}]}),window.innerWidth>i&&o(".slider-news .slide-news").length<=3&&o(".section-news .slick-arrow").addClass("slick-disabled")},viewLogos:function(){var a=o(".js-clients-logos");a.hide(),o.fn.toggleText=function(e,a){return this.text()==e?this.text(a):this.text(e),this},o("#viewLogos").on("click",function(e){e.preventDefault(),sr.reveal(),a.slideToggle(),o(this).parents(".js-logos-container").toggleClass("expanded"),o(this).toggleText("Hide","View all")})},openPositionsFilters:function(){var s=o(".js-careers-filters-wrap a"),t=o(".careers-boxes .position-wrap");s.on("click touchend",function(e){e.preventDefault();var a=o(this);s.removeClass("active"),a.addClass("active"),o(".position-details").slideUp(),o(".position .icon").removeClass("rotated");var i=a.attr("data-filter");"all"==i?t.removeClass("is-animated").fadeOut().finish().promise().done(function(){t.each(function(e){o(this).addClass("is-animated").delay(200*e++).fadeIn()}),o(this).siblings(".no-positions-popup").removeClass("popup-visible")}):t.removeClass("is-animated").fadeOut().finish().promise().done(function(){0==t.filter('[data-category *= "'+i+'"]').length?o(this).siblings(".no-positions-popup").addClass("popup-visible"):o(this).siblings(".no-positions-popup").removeClass("popup-visible"),t.filter('[data-category *= "'+i+'"]').each(function(e){o(this).addClass("is-animated").delay(200*e++).fadeIn()})})})},openPositionsAccordion:function(){var a=o(".position-details"),i=o(".js-accordion-link"),s=o(".position .icon");i.on("click",function(e){e.preventDefault(),!0===o(this).data("slided")?(o(this).parent().siblings(a).slideUp("normal"),s.removeClass("rotated"),o(this).parent().find(s).removeClass("rotated"),o(this).data("slided",!1)):(a.slideUp("normal"),i.data("slided",!1),o(this).parent().siblings(a).slideDown("normal"),s.removeClass("rotated"),o(this).parent().find(s).addClass("rotated"),o(this).data("slided",!0))}),a.hide()},youtube:function(){o(".js-play-video").each(function(){o(this).on("click",function(e){e.preventDefault(),o(".js-video-popup").addClass("visible").find(".js-video")[0].src+="&autoplay=1",o("body").addClass("fixed")})})},initScrollReveal:function(){window.sr=ScrollReveal({mobile:!1}),sr.reveal(".sr-img",{duration:1e3,viewFactor:.1},50),sr.reveal(".sr-block",{duration:1200}),sr.reveal(".sr-block-games",{duration:1200,delay:1500}),sr.reveal(".sr-left",{duration:1700,origin:"left",distance:"30px",delay:600}),sr.reveal(".sr-right",{duration:1700,origin:"right",distance:"30px",delay:600})},initGames:function(){o.when(a_all_games).done(function(t){o.when(a_e1_metadata(t),a_agg(agg_tags,TAG),a_agg(agg_features,FEATURE),a_agg(agg_volatilities,VOLATILITY)).done(function(e,a,i,s){fill_in_gamedata(t.data.game_ids,e[0].data),fill_in_filters(a[0],TAG),fill_in_filters(i[0],FEATURE),fill_in_filters(s[0],VOLATILITY),init_gamesFilters(),init_filters_UI(),setTimeout(function(){hideLoader()},500)})})},mobileGamesFilters:function(){o(window).scroll(function(){var e=o(window).scrollTop();window.innerWidth<=767&&450<=e?o(".search-wrap").addClass("fixed"):768<=window.innerWidth&&window.innerWidth<=920&&700<=e?o(".search-wrap").addClass("fixed"):o(".search-wrap").removeClass("fixed")}),o(".js-mobile-filters").on("click touchend",function(e){e.preventDefault(),o(this).parents("body").find(".column-options").addClass("visible"),o("body").addClass("no-scroll")}),o(".btn-close-popup").on("click touchend",function(){o(this).parent(".column-options").removeClass("visible"),o("body").removeClass("no-scroll")})},formValidation:function(){o("#contact-form-name").on("blur",function(){var e=o(this);4<=e.val().length?(e.removeClass("invalid").addClass("valid"),e.next(".validation-alert").text("").removeClass("error").addClass("ok")):(e.removeClass("valid").addClass("invalid"),e.next(".validation-alert").text("Name must contain more than 4 characters").removeClass("ok").addClass("error"))}),o("#contact-form-email").on("blur",function(){var e=o(this);/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e.val())?(e.removeClass("invalid").addClass("valid"),e.next(".validation-alert").text("").removeClass("error").addClass("ok")):(e.removeClass("valid").addClass("invalid"),e.next(".validation-alert").text("Enter a correct email").removeClass("ok").addClass("error"))}),o("#contact-form-subject").on("blur",function(){var e=o(this);o(this).val()?(e.removeClass("invalid").addClass("valid"),e.next(".validation-alert").text("").removeClass("error").addClass("ok")):(e.removeClass("valid").addClass("invalid"),e.next(".validation-alert").text("You must enter the subject").removeClass("ok").addClass("error"))}),o("#contact-form-message").on("blur",function(){var e=o(this);o(this).val()?(e.removeClass("invalid").addClass("valid"),e.next(".validation-alert").text("").removeClass("error").addClass("ok")):(e.removeClass("valid").addClass("invalid"),e.next(".validation-alert").text("You must enter the message body").removeClass("ok").addClass("error"))}),o("#contact-form").on("submit",function(e){e.preventDefault();var a=o("#contact-form-name"),i=o("#contact-form-email"),s=o("#contact-form-subject"),t=o("#contact-form-message");if(!(a.hasClass("valid")&&i.hasClass("valid")&&s.hasClass("valid")&&t.hasClass("valid")))return alert("Fill in all fields");o.ajax({type:"POST",url:"https://contact-us-193310.appspot.com/sendmail",contentType:"application/json",dataType:"json",data:JSON.stringify({name:a.val(),email:i.val(),subject:s.val(),message:t.val(),captcha:grecaptcha.getResponse()}),success:function(){alert("Your message was successfully sent."),grecaptcha.reset()},error:function(){alert("We were not able to submit for message."),grecaptcha.reset()}})})},cookies:function(){var i="cookiesok";o("#close-cookie-warn").on("click",function(e){e.preventDefault();var a=new Date;a.setTime((new Date).getTime()+2592e6),document.cookie=i+"=1;expires="+a,o("#cookie-warn").addClass("close")}),-1===("; "+document.cookie+";").indexOf("; "+encodeURI(i)+"=")&&o("#cookie-warn").show()}},project_nameModule.init()}),$(".render-email").each(function(){var e=$(this);e.html(displayEmail(e.data("email"),e.data("subject")))});