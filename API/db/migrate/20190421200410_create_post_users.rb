class CreatePostUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :post_users do |t|
      t.references :post, index: true, foreign_key: true
      t.references :tagged_user

      t.timestamps
    end

    add_foreign_key :post_users, :users, column: :tagged_user_id
    add_index :post_users, [:tagged_user_id, :post_id], unique: true
  end
end
