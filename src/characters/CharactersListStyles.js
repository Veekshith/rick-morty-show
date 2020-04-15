import styled from 'styled-components';

const CharactersListWrapper = styled.div`
    min-height: 100vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-content: baseline;
    gap: 1.5rem;
    background: black;
    padding: 1rem;

    .notfound {
        color: white;
        font-size: 1.3rem;
    }

    @media screen and   (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr)
    }
    @media screen and (max-width: 560px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export default CharactersListWrapper;