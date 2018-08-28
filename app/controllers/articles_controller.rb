# module Api
#  module V1
    # class ArticlesController < ::Api::ApiController
    class ArticlesController < ApiController
      # GET /drinks
      def index
        @articles = Article.select("id, title, body").all
        render json: @articles.to_json
      end

      # GET /drinks/:id
      def show
        @article = Article.find(params[:id])
        render json: @article.as_json(only: [:id, :title, :body]) 
      end

      def create
        article = Article.new(article_params)
        if article.save
          render json: {status: 'SUCCESS', 
                        message: 'Saved successfully', 
                        data: article}, 
          status: :ok
        else 
          render json: {status: 'ERROR', 
                        message: 'Article not saved', 
                        data: article.errors}, 
          status: :unprocessable_entity
        end
      end

      def destroy 
        article = Article.find(params[:id])
        article.destroy
        render json: {status: 'SUCCESS', 
                      message: 'Deleted successfully', 
                      data: article}, 
        status: :ok
      end

      def update 
        article = Article.find(params[:id])
        if article.update_attributes(article_params)
          render json: {status: 'SUCCESS', 
                      message: 'Updated successfully', 
                      data: article}, 
          status: :ok
        else
          render json: {status: 'ERROR', 
                        message: 'Not updated', 
                        data: article.errors}, 
          status: :unprocessable_entity
        end
      end

      
      private

      def article_params
        params.permit(:title, :body)
      end
    end
#   end
# end