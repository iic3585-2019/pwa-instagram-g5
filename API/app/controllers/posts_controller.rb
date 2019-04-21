class PostsController < ApplicationController

  def get_friends_posts



    friends = User.find(params[:user_id]).friends

    total_posts = []

    friends.each do |f|
      total_posts << f.posts
    end

    render json: {success: true, posts: total_posts.flatten}

  end

end
