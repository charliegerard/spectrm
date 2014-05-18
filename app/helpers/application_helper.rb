module ApplicationHelper
	def usernav
		links = ''
		if @current_user
			greeting = "Sign out #{@current_user.username}"
			links += "<p>#{link_to(greeting, login_path, :method => :delete, :confirm => 'Are you sure you wish to log out?')}</p>"
		elsif @current_user && @current_user.admin
		links += "<p>YOU ARE ADMIN</p>"
		end
		links	
	end
end
