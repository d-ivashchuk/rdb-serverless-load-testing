<br />

<div align="center">
  <h1>PostgresQL benchmark with serverless functions 𐄷</h1>
  <p><h3 align="center">Technologies used ⚙️</h3></p>
  <a href="https://nextjs.org/">Next.js</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.prisma.io/">Prisma</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.digitalocean.com/">Digital ocean</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://k6.io/">K6</a>
  
</div>

<br />

###  Benchmark architecture

Prisma accepts environment variable as database connection string - this **Next.js** app is ran on **Vercel** on two instances. Each instance accepts different db connection string - in one case it is a simple managed DB from **Digital Ocean**, in other case it's a PG bouncer powered managed DB on **Digital Ocean**.

- https://rdb-serverless-load-testing.vercel.app
- https://rdb-serverless-load-testing-pg-bouncer.vercel.app

`k6` directory implements load tests to be run against these two branches.

### Results

In case of plain DB serverless functions quickly exhaust connection limits of the DB which results in failed requests thus in failed threshold of K6 testing.

In case of PG bouncer powered db everything works as expected with little performance downsides.


### Alternatives to the approach

Using serverless oriented DB with serverless functions - [Dynamo](https://aws.amazon.com/dynamodb/?trk=ps_a134p000006padwAAA&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_EEM&sc_publisher=Google&sc_category=Database&sc_country=EEM&sc_geo=EMEA&sc_outcome=acq&sc_detail=amazon%20dynamodb&sc_content=DynamoDB_e&sc_matchtype=e&sc_segment=536393757514&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Database|DynamoDB|EEM|EN|Text|xx|EU&s_kwcid=AL!4422!3!536393757514!e!!g!!amazon%20dynamodb&ef_id=Cj0KCQjwtrSLBhCLARIsACh6RmgfQwd-go1m8QLhhVuIJDIzEIXaaMOjjfwqqDa2MVCf7JjAoLgaGHsaAhXJEALw_wcB:G:s&s_kwcid=AL!4422!3!536393757514!e!!g!!amazon%20dynamodb), [Aurora](https://aws.amazon.com/rds/aurora/)

Using [Prisma Data Proxy](https://www.youtube.com/watch?v=iyGZ8JFPgoY)

