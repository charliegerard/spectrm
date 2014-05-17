class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

    before_filter :authenticate

  private
  def authenticate
    if session[:user_id].present?
      #create user to be available on all pages
      @current_user = User.find session[:user_id]
      #backup incase user id doesn't exist 
      session[:user_id] = nil unless @current_user
    end
  end
end
