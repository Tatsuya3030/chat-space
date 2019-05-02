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
      var html = buildHTML(data);
      $('.main-content__center').append(html);
      $('messageform')[0].reset();
      $(".main-content__center").animate({scrollTop:$('.main-content__center')[0].scrollHeight});
      $(".messageform__sentbutton").prop('disabled', false);
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
});
