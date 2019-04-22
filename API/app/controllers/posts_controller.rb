class PostsController < ApplicationController

  def get_friends_posts
    friends = User.find(params[:user_id]).friends

    total_posts = []

    friends.each do |f|
      total_posts << f.posts
    end

    render json: {success: true, posts: total_posts.flatten}
  end

  def create_post

    if params[:user_id].blank? or params[:content].blank?
      render json: {message: "Faltan parámetros :("}, status: :bad_request and return
    end

    new_post = Post.new({
        user_id: params[:user_id],
        content: params[:content]})

    unless new_post.save()
      render json: {message: "No se pudo crear el post"}, status: :internal_server_error and return
    end

    unless params[:tagged_friend].blank?
      friend = User.find(params[:tagged_friend])
      new_post.tagged_users << friend
    end

    render json: {success: "ok", created_post: new_post}
  end

end
