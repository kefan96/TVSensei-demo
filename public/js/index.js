// $('#slogan-en').on('click', () => {
//     $('#slogan-en').addClass('hide');
//     $('#slogan-jp').removeClass('hide');
// });

// $('#slogan-jp').on('click', () => {
//     $('#slogan-jp').addClass('hide');
//     $('#slogan-en').removeClass('hide');
// });

const slogans = {
    'Language learning, now entertaining': 0,
    '言語学習、今面白い': 1,
    '语言学习，现在变得有趣': 2
}

$('#landing-header li').on('click', function(){
    $(this).addClass('hide');
    let index = slogans[$(this).text()];
    if (index == 2) {
        $($('#landing-header ul').children()[0]).removeClass('hide');
    } else {
        $($('#landing-header ul').children()[index+1]).removeClass('hide');
    }
});

