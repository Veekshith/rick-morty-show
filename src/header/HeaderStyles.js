import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: grid;
 position: sticky;
 top: 0;
 z-index: 1000;
  .custom-navbar {
    .custom-nav {
      display:grid;
      width: 100%;
      grid-template-columns: repeat(4, auto);
      justify-content: space-around;
      align-items: baseline;
      padding-top: 1rem;
      gap: 1rem;
      @media screen and (max-width: 767px) {
        grid-template-columns: auto;
      }
    }
  }

  
`;

export default HeaderWrapper;
