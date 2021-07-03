import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Form, Input, Button, Spin, Empty } from 'antd';

import { useFetch } from 'services/hooks/fetch';

import { MemberList } from 'components/MemberList';

import styles from 'styles/pages/Home.module.scss';

export default function Home() {
  const [form] = Form.useForm();
  const {
    data: members,
    get: getMembers,
    loading: loadingMembers,
    error: errorMembers,
  } = useFetch();

  const handleSubmitSearchOrgs = useCallback(async (field) => {
    form.validateFields();

    const org = field?.orgs.trim();

    try {
      await getMembers({
        url: `https://api.github.com/orgs/${org}/members`,
      });
    } catch (error) {}

    form.resetFields();
  }, []);

  useEffect(() => {
    console.log({ members });
  }, [members]);

  // TODO: tentar incrementar funcionalidade de paginação

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundBanner}>
        <Image
          src='/images/logo.svg'
          alt='github-search-engine'
          className={styles.logoImg}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.searchBox}>
        <h2>Explore repositórios no Github.</h2>
        <Form form={form} onFinish={handleSubmitSearchOrgs}>
          <Form.Item
            className={styles.searchOrgsItem}
            name='orgs'
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
                      <Empty description='Nenhuma organização foi encontrada' />
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
