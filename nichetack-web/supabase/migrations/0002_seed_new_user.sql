-- 0002_seed_new_user.sql
-- Give every new account a copy of the 18 demo items, so the app is never
-- empty on first sign-in. Runs as a trigger on auth.users insert, so every
-- signup path (password, magic link, future OAuth) seeds transactionally.
-- Values transcribed from src/lib/data.ts (ITEMS + ITEM_NOTES).

create or replace function public.seed_items_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.items
    (user_id, kind, title, source, price, state, ar, seed, tags, price_history, read_time, note)
  values
    (new.id, 'product', 'Hario V60 02 Ceramic', 'kinto-usa.com', 38, 'active', '4/5', 'coffee2',
       array['coffee','ritual','gift to self'], array[42,40,38,38,36], null,
       'The 02 size, not the 01 — I already have the 01 somewhere.'),
    (new.id, 'article', 'On Slowness', 'the-paris-review.org', null, 'wishlist', '1/1', 'essay7',
       '{}', '{}', 12, 'Saved for a slow Sunday. Pairs well with the tatami walkthrough.'),
    (new.id, 'video', 'How to Choose Curtains You''ll Actually Love', 'youtube.com · 8 min', null,
       'wishlist', '16/10', 'curtain1', '{}', '{}', null, ''),
    (new.id, 'screenshot', 'Bouclé sofa, oat', 'instagram · @studio.oma', 2400, 'wishlist', '4/5',
       'sofa3', '{}', '{}', null, ''),
    (new.id, 'product', 'A.P.C. Standard Jean', 'apc-us.com', 215, 'wishlist', '3/4', 'denim1',
       array['wardrobe','forever'], array[230,225,225,215,215], null,
       'Standard fit, raw indigo. Size up one — they shrink.'),
    (new.id, 'recipe', 'Marcella''s Tomato Sauce', 'nytimes/cooking', null, 'active', '1/1', 'pasta1',
       '{}', '{}', null, ''),
    (new.id, 'product', 'Linen sheet set, sand', 'morrowsoft.com', 280, 'wishlist', '4/3', 'linen1',
       '{}', array[320,300,290,285,280], null,
       'Bring this back up when the linen sale rolls around in September.'),
    (new.id, 'screenshot', 'kitchen reno, ref', 'tiktok · @apartmenttour', null, 'wishlist', '9/16',
       'kitch2', '{}', '{}', null, ''),
    (new.id, 'product', 'Aesop Hwyl candle', 'aesop.com', 80, 'purchased', '1/1', 'candle1',
       array['gift'], array[80,80,80], null, ''),
    (new.id, 'article', 'The end of the cluttered home', 'kinfolk.com', null, 'wishlist', '3/4',
       'interior9', '{}', '{}', 7, ''),
    (new.id, 'product', 'Snow Peak titanium mug', 'snowpeak.com', 55, 'wishlist', '1/1', 'mug2',
       array['camp','kitchen'], '{}', null, ''),
    (new.id, 'video', 'Tatami room walkthrough', 'youtube.com · 14 min', null, 'active', '16/9',
       'tatami1', '{}', '{}', null, ''),
    (new.id, 'product', 'Issey Miyake pleats tote', 'isseymiyake.com', 360, 'wishlist', '3/4', 'tote1',
       '{}', array[380,360,360,360], null,
       'Only buy if it scores top-three in the next comparison round.'),
    (new.id, 'recipe', 'Caraway loaf, no-knead', 'kingarthur.com', null, 'wishlist', '4/5', 'bread1',
       '{}', '{}', null, ''),
    (new.id, 'screenshot', 'ceramic vase, ref', 'pinterest · saved', null, 'archived', '3/4', 'vase2',
       '{}', '{}', null, ''),
    (new.id, 'product', 'Vintage Lemaire trench, M', 'thereal.com', 640, 'active', '4/5', 'trench1',
       '{}', array[780,720,680,650,640], null,
       'The price keeps sliding — wait for the spring resale drop.'),
    (new.id, 'article', 'Why I gave up my reading list', 'literary-review.com', null, 'wishlist',
       '1/1', 'letters1', '{}', '{}', 5, ''),
    (new.id, 'product', 'Brutalist concrete planter', 'etsy.com · OBJ_studio', 95, 'wishlist', '4/5',
       'planter1', '{}', '{}', null, '');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.seed_items_for_new_user();
