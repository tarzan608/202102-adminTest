import { Link } from 'react-router-dom';

import './Error.css';

const Error = () => {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="left-icon">
            {/* <img src="img/favicon/lo.png"></img> */}
          </div>
          <div className="main-content">
            <div className="error-img">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABICAYAAAA9HjF/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABIFJREFUeNrsmv9R4lAQx+ON/x92ECuQGws4qECsQKgAUgFSAVABsQKxAmMBjrEC6eBiBXfvOYuTi9l9v/I4bub7mXmjQLIsb/ftL0gSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHwYn04uXlZV/92ajVd5RbqpU9Pz8XLTK1vJFaPeH+/X2VWk9qbZWsnUHXHuk6Ei6rSDeNlvdqI9uwP3qltae1rFLJLB1kLNUaOOi935Mq1MCPhjeWKJQCw4a8MRnBSx45Tcnoeqv+zD1l5yS7sjCIdqSZWjcNwzbRhrhTayXJVfLuDU4psVJrIcn/duCIkQbcqx3tkTy+a8Yku2cwrtbhhRwptfis+roXg869AL1nJr0PbeBQejaG8EQb4V4w7ocTeDhpGtEx93pv/oWBHyIaeRZJ9kAZYiTkyVDHTCPpPeIcyNfAOg8OhXWu8sLKQZ7OV2fqnpP9Uo+va4VFkyvH3H1Wk3um1oQKF1vZS4uicFErDjkju9Qf28Z+aL0zQe/WPH7qaeDWCjmALxWherxVXqkN/MaEJVue6rLp/1zJTpgNT1vy7kBw9Ot6FU6n9J7RUUeIvmWFvW7sh9Z7RemprZi8OOYc/N72JG3cLtJ7bi2vuxGizrDZYtHjoXDSpoF6Fy7Fmq+BBwc0fqy8ZVuocS0M257Q89kR7J13iJ6rUPFTCIm3jvK+C20J1/h30RrZDCF6nhFgy6UAHWZtem6PiNKZgSVP1HmmcMzRugr8PBGUZ0ZC5eoi+4IZVMwtqn/OuKXJQPp1qiH6TA1h+gzT+jWU26eCYz51beCuw/AvKny6bsG08/z2zM1pYAQJiTQueldcRPnfBh0fp1edjjyS7FWjaEqF6vmYYOuBWAauIsktqT+OQa42KXOYHh0LuTRzOA0w4Fo4YTE8fJEYBvcBn2XBbFKR+H+BERut90TPC2JU0VnEMMmxi2DcfSHl6pD9wOuqQ+ntG6K7Hj5oeXoUdy4ovfT8kmFLo74fguw5UwmzQwXTlwfU4vUYuaWD3tLQZBnLwF3zMao0TIF8v2R4rW1qJrR2I8eCyhS6p5798551zckyodIexDBw19OY98YUaC0MWFLfN6HNKhxPw52wuWPm9I4TfgL24KF37utoMSZZnxsTkKdXdAJ6jCFCKukF46B6wnTbMoXLaRPbdNmQw+lKdlcbRnCRpgrYE32KH5noM+bkhoTogWFtAk6adIqNYcniFHObPG3medJlITm7Wm80lHgzpJEsUvSZc/XJMQ86VkIxF9q6LITKdN6yuSuH3Cn1q3kkvVPOsY7WwIaTM+Dyn6XsnXCKZ0yenyRuM/CmcScd7Il0iqdtp9hk4JCBRcUMDqz7QkNxcWPZWxbCaeAixLjN4ehXoovEbRadGYxbOraimdBlfCnsTkwaUvvQ9zBu6++NqX+sK1KapjEtv6pold+i61bqOcnjB417donhN8d0n3aCK6ZgK6hazi1/ilvXW19fxNAbAAAAAAAAAAAAAAAAAAAAgL/5I8AAir4IeAj2xkcAAAAASUVORK5CYII="></img>
            </div>
            <div className="error-title">페이지를 찾을 수 없습니다.</div>
            <div className="error-message">
              페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />{' '}
              입력하신 주소가 정확한지 다시 한 번 확인해주세요.
            </div>
            <div className="error-buttons">
              <div
                className="error-backPage error-btn"
                onClick={() => {
                  history.back();
                }}
              >
                이전 페이지
              </div>
              <Link to="/">
                <div className="error-mainPage error-btn">처음으로</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
