---
path: "/spring-graphql-security"
date: "2018-11-05T11:12:33.962Z"
title: "Secure your GraphQL with Spring AOP"
label: ["Spring", "java", "Spring boot", "Spring Security", "AOP", "GraphQL"]
author: "Michal Gebauer"
type: "blog"
# image: "./security.png"
draft: false
---

As I wrote in my previous post ([How GraphQL beats REST when I am hungry](https://mi3o.com/how-graphql-beats-rest)) GraphQL has only one endpoint and that means our security configuration can not be based on requested urls. What could be even worst, there might be some queries or mutations which should be accessible for unauthenticated users, such as login or forgot password... Therefore we lose the possibility to enjoy Spring security filter chain and we must say in general that everyone can try to call our graphQL methods (`.antMatchers("/graphql").permitAll()`):

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=SecurityConfig.java&highlights=9`

<br />

We could write our own `RequestMatcher`, but for that we would need to do the query parsing and resolver mapping and that would mean doing twice the work since the same happens after requests pass the security filter.

<br />

So what now? Our graphQL endpoint is exposed to everyone but we need to protect our methods which are meant only for authenticated and authorized users. For the case of simplicity I will illustrate the situation with three methods in meaningless `Resolver`:

* `unsecuredResource()` can be accessed without authorization
* `securedResource()` can be accessed only by authorized users
* `securedResourceAdmin()` can be called only by users with role ADMIN

<br />

## Method level security

If you noticed in my SecurityConfig, I used `@EnableGlobalMethodSecurity` annotation and that opens for us a new world of security restrictions that we can use on methods' level. Demonstrating all features regarding this annotation is out of scope of this post, for us now is sufficient to know that we can name roles that user must have to access the method. Let's have a look at our resolver

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=ResourceResolver.java&highlights=7`

<br />

> Note: For this simple case, where only the user's role is checked, I could use `@Secured` annotation but in real world application the `@Pre*` and `@Post*` are more powerful option, since they allow to use expressions (SpEl) and can access method arguments and returned values.

<br />

We could secure every method which requires authentication or authorization just using this annotation, but best would be to have a defensive fallback scenario. We don't want to write annotations everywhere and we don't want to have sleepless nights thinking that we might have forgotten to annotate some method - we need a reasonable default that would say: every method without specified security annotation should require by default at least authentication.

<br />

## Spring AOP

If we want to play with Aspect Oriented Programming in Spring, first, we need to enable AOP somewhere in our configuration with `@EnableAspectJAutoProxy` annotation

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=SpringGraphqlSecurityApplication.java&highlights=2`

<br />

The magic behind security done by AOP is following:

1. We need to say that every method, which is inside class that implements (any type of) `Resolver` interface, should throw an Exception in case there is no authentication in security context.
2. Note that only resolvers defined in our application should be taken into consideration, otherwise GraphQL framework's classes will be intercepted during application start up.
3. Additionally, we can name exact methods which will be excluded from this check, in our case `unsecuredResource()`.

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=SecurityQraphQLAspect.java`

<br />

> Important: Did you notice the `@Order(1)` annotation in my aspect? We must ensure that our security aspect is triggered the very first prior any other interceptor if we want to have consistent API (our Exception needs to be the first one to be thrown in case user is not authenticated).

<br />

## Custom annotation

The above explanation should give you the overview of the AOP security idea but we can go one step further and simplify it a bit. In current solution the unsecured method specification is wired and hard-coded in aspect class and is based on exact method signature. Let's create our own annotation that can be reused on any method without further fiddling with pointcut expressions

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=Unsecured.java`

<br />

Now we need to update our aspect class a bit and exclude methods which are annotated with `@Unsecured`

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=SecurityQraphQLAspectWithAnnotation.java`

<br />

Having our own annotation on method is cleaner solution, since everyone can see directly in the code that given method is not protected, instead of having it buried somewhere in configuration. As a result, our resolvers will look similarly to the following one.

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=ResourceResolverWithUnsecured.java`

<br />

That's it. Every methods in our resolvers (except explicitly annotated ones) are now secured and require authentication. Additional rules can be implemented using @Pre @Post annotations or programmatically e.g. using `hasPermission` SpEl method.

<br />

And finally, working with AOP and interceptors is safest when backed-up by integration tests.

<br />

`gist:michalgebauer/5efb8d0d588b4ea3960759ed050ac277?file=SpringGraphqlSecurityApplicationTests.java`

<br />

You can find full working example in my github repository:
[spring-graphql-security](https://github.com/michalgebauer/spring-graphql-security).

Thank you for reading.
