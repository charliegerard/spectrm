class SettingsController < ApplicationController

	def index
		render :json => @current_user.settings
	end

	def new
	end

	def create

		settingName = Setting.where(:name => params[:setting][:name], :user_id => @current_user.id)[0]
		if settingName.present?
			settingName.update_attributes(params[:setting])
			settingName
		else
			settingName = @current_user.settings.create(params[:setting])
		end

		if settingName
			render :json => settingName.to_json
		else 
			render :json => false
		end
	end

	def load
		#binding.pry
		settings = Setting.where(:user_id => @current_user.id)

		if settings.present?
			render :json => settings.to_json
		else 
			render :json => false
		end

	end

	def edit 
	end

	def update
	end

	def destroy
		#binding.pry
	    settingName = Setting.where(:name => params[:setting][:name], :user_id => @current_user.id)
	    if settingName.present?
	    	# setting = settingName[0].update_attributes(params[:setting])
	    	setting = settingName[0]
	    end

	    if setting.destroy
	      render :json => settingName.to_json
	    else
	      render :json => false
	    end
	end

end