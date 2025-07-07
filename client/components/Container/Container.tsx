'use client';
import { IContainer } from '@/interfaces';
import React from 'react';
import styled from '@emotion/styled';

const ContainerWrap = styled.div`
    margin: 0 auto;
	max-width: 1600px;
	width: 100%;
	padding-left: 16px;
	padding-right: 16px;

	@media screen and (max-width: 1470px) {
		max-width: 1370px;
	}

	@media screen and (max-width: 1370px) {
		max-width: 1200px;
	}

	@media screen and (max-width: 1200px) {
		max-width: 1024px;
	}

	@media screen and (max-width: 1024px) {
		max-width: 768px;
	}

	@media screen and (max-width: 768px) {
		max-width: 670px;
	}

	@media screen and (max-width: 670px) {
		max-width: 100%;
	}
`;

const Container = ({ children, className = '' }: IContainer) => {
    return (
        <ContainerWrap className={`container ${className}`}>
            {children}
        </ContainerWrap>
    );
};

export default Container;
