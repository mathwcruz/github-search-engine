import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Form, Input, Button, Spin, Empty } from 'antd';
import Cookies from 'js-cookie';

import { MemberList } from 'components/Members/MemberList';

import { useFetch } from 'services/hooks/fetch';
import { api } from 'services/api';

import styles from 'styles/pages/Home.module.scss';

export type Member = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
};

interface HomeProps {
  orgMembers: Member[];
}

export default function Home({ orgMembers }: HomeProps) {
  const [members, setMembers] = useState<Member[]>([]);

  const [form] = Form.useForm();
  const {
    get: getMembers,
    loading: loadingMembers,
    error: errorMembers,
  } = useFetch();

  const handleSubmitSearchOrgs = useCallback(async (field) => {
    form.validateFields();

    const org = field?.org.trim();

    try {
      const members = await getMembers({
        url: `https://api.github.com/orgs/${org}/members`,
      });

      setMembers(members);
      Cookies.set('org', String(org), { expires: 1 });
    } catch (error) {
      console.log({ error });
    }

    form.resetFields();
  }, []);

  useEffect(() => {
    setMembers(orgMembers);
  }, [orgMembers]);

  // TODO: tentar incrementar funcionalidade de paginação

  return (
    <div className={styles.homeContainer}>
      <div>
        <Image
          src='/images/logo.svg'
          alt='github-search-engine'
          className={styles.logoImg}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.searchBox}>
        <h2>Explore organizações no Github.</h2>
        <Form form={form} onFinish={handleSubmitSearchOrgs}>
          <Form.Item
            className={styles.searchOrgsItem}
            name='org'
            rules={[
              {
                required: true,
                message: 'Insira o nome de uma organização no Github',
              },
            ]}
          >
            <Input
              className={styles.searchOrgsInput}
              bordered={false}
              placeholder='Digite aqui'
            />
          </Form.Item>
          <Button htmlType='submit'>Pesquisar</Button>
        </Form>
      </div>
      <div className={styles.membersList}>
        <ul className={loadingMembers ? `${styles.isLoading}` : ''}>
          {loadingMembers ? (
            <Spin size='large' />
          ) : (
            <>
              {!members && !errorMembers ? (
                <div className={styles.hasntMembers}>
                  <h3>
                    Digite o nome de uma organização para pesquisar seus membros
                  </h3>
                </div>
              ) : (
                <>
                  {errorMembers ? (
                    <div className={styles.hasntMembers}>
                      <Empty description='Nenhuma organização foi encontrada, confira o nome que você digitou' />
                    </div>
                  ) : (
                    <>
                      {members?.map((member) => (
                        <MemberList key={member?.id} member={member} />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { org } = req?.cookies;

  if (org) {
    const { data } = await api.get(
      `https://api.github.com/orgs/${org}/members`
    );

    return {
      props: {
        orgMembers: data,
      },
    };
  }

  return {
    props: {},
  };
};
