
ActiveAdmin.register Transfer do


  permit_params :account_name, :transfer_type, :account_number, :routine_number, :swift_code, :tref, :user_id, :bank_name, :amount, :status, :account_id, :slug, :notes, :country, :otp, :pin



form do |f|

   f.inputs do
     f.input :user_id, :label => 'Users/Client', :as => :select, :collection => User.all.map{|u| ["#{u.email}, #{u.first_name}", u.id]}
     f.input :amount
     f.input :status
   end
   f.submit :submit
 end
 controller do
        def find_resource
          scoped_collection.friendly.find(params[:id])
        end

    end

  end
