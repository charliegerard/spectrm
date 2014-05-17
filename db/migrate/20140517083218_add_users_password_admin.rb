class AddUsersPasswordAdmin < ActiveRecord::Migration
  def change
  	add_column :users, :password_digest, :string
    add_column :users, :admin, :boolean, :default => false
  end
end
