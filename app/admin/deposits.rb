ActiveAdmin.register Deposit do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :method, :amount, :status,
  :date, :account_name, :account_number,
  :swiftcode, :routing_number, :btcw,
   :ethw, :btcnote, :user_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:method, :amount, :status, :date, :account_name, :account_number, :swiftcode, :routing_number, :btcw, :ethw, :btcnote, :user_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :account_name
      f.input :account_number
      f.input :routing_number
      f.input :swiftcode

      para "Crypto Address"
      f.input :btcw, label: "BtC Address"
      f.input :btcnote, label: "Notes/memo"
      f.input :ethw, label: "ETH Address"


    end
    f.actions
  end

end
