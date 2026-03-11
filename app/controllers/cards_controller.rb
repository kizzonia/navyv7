class CardsController < InheritedResources::Base


  layout "accounts"
    before_action :authenticate_user!
    before_action :find_card, only: [ :show, :edit, :update, :destroy]

      def index
        @users = User.where(user_id: current_user)
        @cards = Card.where(user_id: current_user).order('created_at DESC')
        @accounts = Account.where(user_id: current_user).order('created_at ASC')
        @transactions = Transaction.where(user_id: current_user).order('created_at DESC')
        @transfers = Transfer.where(user_id: current_user).order('created_at DESC')


      end

      def show

      end

      def new
        @users = User.where(user_id: current_user)
        @cards = Card.where(user_id: current_user).order('created_at DESC')
        @accounts = Account.where(user_id: current_user).order('created_at ASC')
        @transactions = Transaction.where(user_id: current_user).order('created_at DESC')
        @transfers = Transfer.where(user_id: current_user).order('created_at DESC')

        @card = current_user.cards.build

      end

      def create
        @card = current_user.cards.build(card_params)
        if @card.save
          user = User.find_by_id(@card.user_id)
          card = @card
      redirect_to root_path, notice: "card request successful, you will be notified soon"
    else
          render 'new'
        end
      end
      def edit

      end

      def update
        if @card.update(card_params)
          redirect_to @card
        else
          render 'edit'
        end
      end

      private
      def find_card
        @card = card.find(params[:id])

      end

    def card_params
      params.require(:card).permit(:name, :card_number, :card_type, :cvv, :date, :slug, :status, :user_id, :card_type, :card_company, :arrivaltime, :cardimg,  :address, :zipcode, :phone)
    end

end
