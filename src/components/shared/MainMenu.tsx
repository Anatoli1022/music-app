import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import logo from '../../images/logo.svg'
import profile from '../../images/profile.svg'
import dashboard from '../../images/dashboard.svg'
import favorite from '../../images/favorite.svg'
import liveChat from '../../images/live_chat.svg'
import friends from '../../images/friends.svg'
import mobile from '../../images/mobile.svg'

const MainMenu: React.FC = () => {
  return (
    <MainMenuStyles>
      <ImageWrapper>
        <Link to='/'>
          <Image src={logo} alt='' />
        </Link>
      </ImageWrapper>
      <MenuWrapper>
        <Title>menu</Title>
        <ListMenu>
          <Item>
            <StyledLink to='/'>
              <Image src={profile} alt='' />
              <LinkText>profile</LinkText>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to='/'>
              <Image src={dashboard} alt='' />
              <LinkText>dashboard</LinkText>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to='/'>
              <Image src={favorite} alt='' />
              <LinkText>favorite</LinkText>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to='/'>
              <Image src={liveChat} alt='' />
              <LinkText>live chat</LinkText>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to='/'>
              <Image src={friends} alt='' />
              <LinkText>friends</LinkText>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to='/'>
              <Image src={mobile} alt='' />
              <LinkText>mobile app</LinkText>
            </StyledLink>
          </Item>
        </ListMenu>
      </MenuWrapper>
      <MenuWrapper>
        <Title>help</Title>
        <ListHelp>
          <Item>
            <StyledLink to='/'>
              <Image src={profile} alt='' />
              <LinkText>settings</LinkText>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to='/'>
              <Image src={dashboard} alt='' />
              <LinkText>FAQs</LinkText>
            </StyledLink>
          </Item>
        </ListHelp>
      </MenuWrapper>
      <LinkInfo to=''>version 5.5.1</LinkInfo>
    </MainMenuStyles>
  )
}

export default MainMenu

const MainMenuStyles = styled.div`
  padding-top: 40px;
  background: #111;
  box-shadow: 6px 4px 100px 0px rgba(0, 0, 0, 0.8);
  padding-left: 25px;
  padding-right: 25px;
`
const ImageWrapper = styled.div``

const Image = styled.img`
  vertical-align: middle;
`

const MenuWrapper = styled.div`
  margin: 64px 0 0 0;
  &:nth-of-type(3) {
    margin: 102px 0 0 0;
  }
`

const Title = styled.h2`
  color: #b8b8b8;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 0.38px;
  text-transform: capitalize;
`
const ListMenu = styled.ul`
  border-top: 1px solid #b5179e;
  padding-top: 45px;
  margin-top: 13px;
`

const ListHelp = styled.ul`
  border-top: 1px solid #b5179e;
  padding-top: 30px;
  margin-top: 13px;
`

const Item = styled.li``

const StyledLink = styled(Link)`
  display: block;
  transition: 0.3s;
  border-radius: 6px;
  padding: 15px 72px 15px 16px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(94deg, #b5179e -13.04%, #7209b7 124.22%);
  }
`

const LinkText = styled.p`
  display: inline-block;
  color: #b8b8b8;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.32px;
  vertical-align: middle;
  text-transform: capitalize;
  margin: 0 0 0 19px;
`

const LinkInfo = styled(Link)`
  display: block;
  color: #7a7a7a;
  font-size: 14px;
  margin: 187px auto 0 auto;
  width: 86px;
  font-weight: 400;
  letter-spacing: 0.28px;
  text-decoration-line: underline;
  text-transform: capitalize;
`
