export default async function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1
          className="scroll-m-20 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl"
          data-testid="headingMain"
        >
          Lists of users
        </h1>
      </div>
    </section>
  )
}