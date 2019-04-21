class UsersController < ApplicationController

  def get_friends_list
    params[:user_id]
    friends = User.find(params[:user_id]).friends
    render json: {success: true, friends: friends}
  end

end
