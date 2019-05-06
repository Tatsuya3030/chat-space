$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="lower-meesage">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if ( data.content != undefined ){
      var html = buildHTML(data);
      $('.main-content__center').append(html);
      $(".main-content__center").animate({scrollTop:$('.main-content__center')[0].scrollHeight});
      $('.messageform').val('');
      $(".messageform__sentbutton").prop('disabled', false);
      }
      else{
        alert("メッセージを入力して下さい")
      }
    })

    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $(".main-content__center").animate({scrollTop:$('.main-content__center')[0].scrollHeight});
      var message_id = $('.message').last().data('id');
      $.ajax({
        url: location.href,
        type: "GET",
        data: {id: message_id},
        dataType: "json"
      })
      .done(function(data) {
        data.forEach(function(message) {
          var html = buildHTML(message);
          $('.main-content__center').append(html);
          $(".main-content__center").animate({scrollTop:$('.main-content__center')[0].scrollHeight});
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(interval);
      }
  } , 5000 );
});
