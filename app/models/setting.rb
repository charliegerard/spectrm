# == Schema Information
#
# Table name: settings
#
#  name    :string(255)
#  details :text
#

class Setting < ActiveRecord::Base
	attr_accessible :name, :details
	serialize :details

	belongs_to :user
end
