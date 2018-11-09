---
path: "/throwing-a-party"
date: "2018-08-27T11:12:33.962Z"
title: "Throwing a party without a container"
label: ["container", "java", "Spring", "JEE", "ThreadLocal", "security"]
author: "Michal Gebauer"
type: "blog"
image: "./party.png"
draft: false
---

OK, so there we have some Servlet container, some EJB container, Spring container, this container, that container... Cool, everyone uses container, but why? Can't we just make class instances by ourselves? To prove it I decided to make a party and I'll do it in an old fashioned way without any help of container.

## Let's throw a party

I will focus just on one person, as to make the example simple. Meet my friend, ordinary party goer, Bob:

```java
class Bob implements InvitedBuddy {

  @Override
  public void partyTime() {
    partyService.joinParty("What's up guys?");
    snackService.gimme("burger");
    barService.canIHave("beer", 1);
    barService.canIHave("vodka", 1);
    barService.oneMorePlease();

    socialService.makeAJoke("A dyslexic man walks into a bra.");
    barService.oneMorePlease();
    // beginning of the end
    socialService.huntForGirls();
    barService.canIHave("Whatever but fast", Integer.MAX_VALUE);
    socialService.makeAJoke("..."); // you really don't want to hear this one

    RuntimeException up = new AlcoholOverflowException("blarghhhh");
    throw up;
  }
}
```

Brief examination:

* Bob joins the party and says hello - so we'll need authentication.
* He drinks an alcohol. OK, it's legal for Bob but what about the others? - authorization added.
* Can't judge, but seems after several calls to barService there might be a case when something is thrown, e. g. en Exception - would be nice to involve transactions.
* And last but not least, I'd like to keep track of everything that is happening at the party - let's put logging in place

## Security

We want to have private party therefore every service call must require fully authenticated and in case of barService also authorized users. Let's start with a very very simplified login mechanism:

```java
public class PartyService {
  // imagine constructor and other stuff here..

  // login to party
  public String joinParty(String hello) {
    // try to recognize who is talking to you
    Friend friend = friendRepository.findByVoiceAndFace(hello, faceScan);

    // unknown people shell not pass
    if (friend == null) {
      throw new HeyManWhatAreYouDoingHereException();
    }

    // generate and remember unique ID for your friend
    String partyId = UUID.randomUUID();
    partyMap.put(partyId, friend);

    // pass your friend ticket he will use to
    // call service methods
    return partyId;
  }

  // Here is how to check if someone is allowed to be at party
  public Friend whoIsThisGuy(String partyId) {
    Friend friend = partyMap.get(partyId);
    if (friend == null) {
      throw new HeyManWhatAreYouDoingHereException();
    }

    return friend;
  }
}
```

Now we have the authentication for people joining our party. Everyone who comes will receive a ticket to avoid unnecessary re-authentication and will show it to stuff when he visits the snack or bar service:

```java
public class BarService {
  // ... omitted lines of no interest

  public Beverage canIHave(String partyId, String type, int amount) {
    // Check if he is who ho he pretends to be
    partyService.whoIsThisGuy(partyId);

    // OK, no Exception was thrown - verified, handle his request
    // ...
  }
}

public class SnackService {
  // ... omitted lines of no interest

  public Snack gimme(String partyId, String type) {
    // Check if he is who ho he pretends to be
    partyService.whoIsThisGuy(partyId);

    // OK, no Exception was thrown - verified, handle his request
    // ...
  }
}
```

Did you spot the differences in the services' methods? No? That's right since there is not any. Every service method in our party:

* must have _partyId_ argument
* must verify the caller before the request is handled

What we got here is code duplication and certainly code pollution - imagine we plan to have also music service, game service, darts service... What we want here is to get rid of boilerplate code and focus only on our party business.

Our little security verification code spreads all over our application and in programming terminology it would be called an _aspect_. And how to deal with aspects? Well, these are best addressed by Aspect-Oriented Programming (AOP). In a nutshell, to organize such scattered code you need to create a rule which says in which classes and methods you want to call your aspect. That way you can fully remove your repetitive code lines and have it just in one place.

Warning, spoiler follows: All of the points I put down at the beginning (security, transaction, logging) are very good candidates for AOP and would be solved in very similar way as I am going to deal with authentication. Therefore, for the sake of you precious time, those will not be covered in my post.

But let's go step by step.

## Forget tickets, use wristbands

We don't want people at our party to care about tickets whenever they need something. That would spoil the fun certainly. I will store the tickets on them - I will use wristbands. Can you think of any Java wristband implementation?

[ThreadLocal](https://docs.oracle.com/javase/8/docs/api/java/lang/ThreadLocal.html) is a storage which is unique for each thread that accesses it. I know that everyone at my party uses just one thread, we are having a standard _Servlet_ party, therefore I will use _Threads_ to store the party identification:

```java
public class PartyService {
  public void joinParty(String hello) {
    // same good old code lines here as before

    // NOT NEEDED ANYMORE:
    // String partyId = UUID.randomUUID();
    // sessionMap.put(partyId, friend);

    // every guest has its own body (thread)
    // for the wristband ticket;
    partyThreadLocal.set(friend);

    // no need to return anything from this method
  }

  // we don't need partyId argument here anymore
  public void whoIsThisGuy() {
    Friend friend = partyThreadLocal.get();
    if (friend == null) {
      throw new HeyManWhatAreYouDoingHereException();
    }

    return friend;
  }
}
```

Fine, we are half way there. Now we don't need the _partyId_ argument, but we still need to call the verification in all services and theirs methods:

```java
public class BarService {
  // ... omitted lines of no interest for now

  public Beverage canIHave(String type, int amount) {
    // the caller will be identified by the thread he is using
    partyService.whoIsThisGuy();

    // ... actual method implementation
  }
}

// the same applies to other services...
```

## Step two, method call removal

I don't want other services to do the party people verification. They might forget it, or do it wrong.
Instead, I will do it myself. And how? What about wrapping services in a proxy and intercept every action they do:

```java
  // create an instance of service to be wrapped
  IBarService target = new BarService();
  // create a proxy
  IBarService barService = (IBarService) Proxy.newProxyInstance(
      BarService.class.getClassLoader(),
      // Proxy from JDK API can work only with classes that implement interface(s)
      new Class[] { IBarService.class },
      (proxy, method, arguments) -> {
          // before every service method call verification is triggered
          partyService.whoIsThisGuy();
          // call the original method
          return method.invoke(target, arguments);
      }
  );
```

Ta-da! Using this approach we can get rid of all authentication logic from service classes and they can solely focus on their own business:

```java
public class BarService implements IBarService {
  // ... other methods here

  @Override
  public Beverage canIHave(String type, int amount) {
    // this method does not even care about verification
    // it is done by me

    // method implementation
  }
}

// the same applies to other services...
```

What we achieved here is that if we apply similar logic to all other issues on our list (authorization, transactions, logging) we will get very clean code that is much easier to read, develop, maintain and test and is not tangled with repetitive code that relates mainly to infrastructure.

## Conclusion

And now is the right time for a moment of a reflection. How did the code transform?

For my solution to be feasible

* I need to be the one who constructs services' instances
* I intercept and manage code flow of the services

Which means I am now the one who fully controls the party. More precisely, what happened here is an Inversion of Control, so called IoC or someone might call it _Container_ pattern. And the bottom line is, I reinvented the wheel.

Container is not imaginary black box that just does something. It's a real code that was created for you to make your life as a programmer easier. Had I started from the beginning with Spring and used its capabilities I would have my whole party done by now.

<br />

_The story, all names, characters, and incidents portrayed in this production are fictitious. No identification with actual persons is intended or should be inferred. Especially, barService() has nothing to do with famous foo() and bar() actors._
