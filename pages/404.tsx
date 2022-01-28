import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useLocale } from "@lib/hooks/useLocale";

import { HeadSeo } from "@components/seo/head-seo";

import { ssgInit } from "@server/lib/ssg";

export default function Custom404() {
  const { t } = useLocale();
  const router = useRouter();
  const isSubpage = router.asPath.includes("/", 2);

  return (
    <>
      <HeadSeo
        title={t("404_page_not_found")}
        description={t("404_page_not_found")}
        nextSeoProps={{
          nofollow: true,
          noindex: true,
        }}
      />
      <div className="min-h-screen px-4 bg-white">
        <main className="max-w-xl pt-16 pb-6 mx-auto sm:pt-24">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-black uppercase">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 font-cal sm:text-5xl">
              {t("page_doesnt_exist")}
            </h1>
            {isSubpage ? (
              <span className="inline-block mt-2 text-lg ">{t("check_spelling_mistakes_or_go_back")}</span>
            ) : (
              ""
            )}
          </div>
          <div className="mt-12">
            <div className="mt-8">
              <Link href="/">
                <a className="text-base font-medium text-black hover:text-gray-500">
                  {t("or_go_back_home")}
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssr = await ssgInit(context);

  return {
    props: {
      trpcState: ssr.dehydrate(),
    },
  };
};
