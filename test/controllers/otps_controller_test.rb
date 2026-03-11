require 'test_helper'

class OtpsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @otp = otps(:one)
  end

  test "should get index" do
    get otps_url
    assert_response :success
  end

  test "should get new" do
    get new_otp_url
    assert_response :success
  end

  test "should create otp" do
    assert_difference('Otp.count') do
      post otps_url, params: { otp: { otp: @otp.otp, transfer_id: @otp.transfer_id } }
    end

    assert_redirected_to otp_url(Otp.last)
  end

  test "should show otp" do
    get otp_url(@otp)
    assert_response :success
  end

  test "should get edit" do
    get edit_otp_url(@otp)
    assert_response :success
  end

  test "should update otp" do
    patch otp_url(@otp), params: { otp: { otp: @otp.otp, transfer_id: @otp.transfer_id } }
    assert_redirected_to otp_url(@otp)
  end

  test "should destroy otp" do
    assert_difference('Otp.count', -1) do
      delete otp_url(@otp)
    end

    assert_redirected_to otps_url
  end
end
