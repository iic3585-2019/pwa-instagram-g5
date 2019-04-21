class CreateUserFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :user_friends do |t|
      t.references :user,index: true, foreign_key: true
      t.references :friend, index: true
      t.timestamps
    end
    add_foreign_key :user_friends, :users, column: :friend_id
    add_index :user_friends, [:user_id, :friend_id], unique: true
  end
end
