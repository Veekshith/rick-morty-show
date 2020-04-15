import styled from "styled-components";

const CharacterWrapper = styled.div`
  display: grid;
  .character-card {
    .character-card-header {
      position: relative;
      padding: 0;
      .character-card-header-text {
        width: 100%;
        position: absolute;
        bottom: 0;
        display:grid;
        color: white;
        font-size: 1.3rem;
        padding: .5rem;
      }
      .character-card-image-mask {
        width: 100%;
        padding: 2.5rem;
        position: absolute;
        bottom: 0;
        background: grey;
        opacity: 0.5;
      }
    }
    .character-card-body {
      display: grid;
      padding:.5rem;
      
      .character-attributes {
        display: grid;
        .character-attribute {
          display: grid;
          justify-content: space-between;
          grid-template-columns: repeat(2, auto);
          padding: .5rem 0;
          &:not(:last-child) {
              border-bottom: 1px solid grey;
          }
          .character-attribute-label {
            color: grey;
            text-transform: uppercase;
          }
          .character-attribute-value {
              color: orange;

          }
        }
      }
    }
  }
`;
export { CharacterWrapper };
