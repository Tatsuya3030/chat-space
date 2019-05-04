json.content  @message.content
json.image  @message.image.url
json.user_name  @message.user.name
json.date  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id  @message.id

# json.(@message, :content, :image)
# json.created_at format_posted_time(@message.created_at)
# json.user_name @message.user.name
# #idもデータとして渡す
# json.id @message.id
