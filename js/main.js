$(function () {
    /*=================================================
    ハンバーガーメニュー
    ===================================================*/
    $('.toggle_btn').on('click', function () {
        $('header').toggleClass('open');
    });

    $('hamberger-menu a , .menu-mask').click(function () {
        $('header').removeClass('open');
    });


    /*=================================================
      タッチデバイス用  トップへ移動/ボタン
    ===================================================*/
    let toTop = $(".to-top");
    const circle = $(".circle");
    const greenBtn = $(".green-btn");

    // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
    toTop.hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {//上から100pxスクロールしたら
            toTop.fadeIn();  // 表示
        } else {
            toTop.fadeOut(); // 非表示
        }
    });

    // スマホ判定（PC は hover 任せ）
    const isMobile = window.matchMedia("(hover: none)").matches;

    circle.on('click', function (e) {

        // モバイルだけ「即ジャンプを防止」
        if (isMobile) {
            e.preventDefault();
            toTop.addClass("active");
        }

        // circle の3D回転（0.8s）終了を待つ
        circle.one("transitionend webkitTransitionEnd", function () {
            // 遷移
            $("html,body").animate({ scrollTop: 0 }, 800,
                function () {
                    toTop.removeClass('active');
                });
        });
    })

    $(".green-btn a").on('click', function (e) {

        //クリックされた要素（aタグ）のhref 属性の値を取り出して、link に入れる
        const link = $(this).attr("href");
        //クリックされた aタグから見て、一番近い .green-btn を親方向に探して取得
        const btn = $(this).closest(".green-btn");

        if (isMobile) {
            e.preventDefault();
            btn.addClass("active");

            //演出を見せる猶予
            setTimeout(() => {
                window.location.href = link;
            }, 150);

            // active解除（戻る／中断対策）
            setTimeout(() => {
                btn.removeClass("active");
            }, 400);
        }
    })

    /*=================================================
            slick
    ===================================================*/

    const slideItem = $('.slide-items');

    slideItem.slick({
        autoplay: false,
        arrows: false,
        // autoplaySpeed: 4000,
        // infinite: true,
        centerMode: false,
        slidesToShow: 4,
        // cssEase: 'linear',

        responsive: [{
            breakpoint: 1120,
            settings: {
                slidesToShow: 3,
                centerPadding: '50px',
            },
        },
        {
            breakpoint: 800,
            settings: "unslick",
        },
        ]
    });

    // スクロールイベントの監視
    slideItem.on('wheel', function (e) {

        // slick が存在しない（スマホなど）の場合は何もしない
        if (!$(this).hasClass('slick-initialized')) {
            return;
        }

        e.preventDefault();

        if (!slideItem.hasClass('js-slick-moving')) {
            if (e.originalEvent.deltaY < 0) {
                $(this).slick('slickNext');
            } else {
                $(this).slick('slickPrev');
            }
        }
    });

    // スライド送り中を判定するためにクラスを付与する
    slideItem.on('beforeChange', function () {
        slideItem.addClass('js-slick-moving');
    });

    slideItem.on('afterChange', function () {
        slideItem.removeClass('js-slick-moving');
    });


});


/*=================================================
         
===================================================*/

