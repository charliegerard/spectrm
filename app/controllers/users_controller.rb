class UsersController < ApplicationController
    before_filter :check_if_logged_in, :except => [:show, :new, :create]

  def index
    @user = User.all
  end

  def create
    @user = User.new params[:user]
    if @user.save
      session[:user_id] = @user.id
      redirect_to @user
    else
      render :new
    end
  end

  def new
     @user = User.new
  end

  def edit
  end

  def show
    @user = User.find params[:id]
  end

  def update
  end

  def destroy
    user = User.find params[:id]
    user.destroy
    #redirect_to users_path, :notice => "user deleted"
  end

    private
  def check_if_logged_in
    redirect_to(root_path) if @current_user.nil?
  end
  
  def check_if_admin
    redirect_to(root_path) if @current_user.nil? || @current_user.admin == false
  end
end
