import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import { LinkItemType } from 'fumadocs-ui/layouts/links';
import {linksApi} from "@/data/links-api";
import {linksResources} from "@/data/links-resources";
import {linksSolutions} from "@/data/links-solutions";
import {linksAbout} from "@/data/links-about";
import clsx from 'clsx';
import * as heroIcons from '@heroicons/react/24/solid';
import { iconResolver } from "@/lib/iconResolver";

const colors = [
  "blue", "purple", "pink", "green", "teal", "yellow", "red", "lime"
]

export const navbarLinks: LinkItemType[] = [
  {
    type: "custom",
    on: "nav",
    children: (
      <NavbarMenu>
        <NavbarMenuTrigger>SDK</NavbarMenuTrigger>
        <NavbarMenuContent>
          {
            linksApi.map((item, index) => (
              <NavbarMenuLink href={item.link} key={item.link}>
                {typeof item.icon === typeof heroIcons ? (
                  <item.icon className={
                      clsx(
                        "mr-3 h-5 w-5",
                        index < 8 && `text-${colors[index]}-500`
                      )
                    }
                  />
                  ) :
                  <div>
                    {iconResolver(item.icon as string, "mr-3 h-5 w-5")}
                  </div>
                }
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-fd-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              </NavbarMenuLink>
            ))
          }
        </NavbarMenuContent>
      </NavbarMenu>
    ),
  },

  {
    type: "custom",
    on: "nav",
    children: (
      <NavbarMenu>
        <NavbarMenuTrigger>Resources</NavbarMenuTrigger>
        <NavbarMenuContent>
          {
            linksResources.map((item, index) => (
              <NavbarMenuLink href={item.link} key={item.link}>
                <item.icon className={
                      clsx(
                        "mr-3 h-5 w-5",
                        index < 8 && `text-${colors[8-(index+1)]}-500`
                      )
                    }
                  />
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-fd-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              </NavbarMenuLink>
            ))
          }
        </NavbarMenuContent>
      </NavbarMenu>
    ),
  },

  {
    type: "custom",
    on: "nav",
    children: (
      <NavbarMenu>
        <NavbarMenuTrigger>Solutions</NavbarMenuTrigger>
        <NavbarMenuContent>
          {
            linksSolutions.map((item, index) => (
              <NavbarMenuLink href={item.link} key={item.link}>
                <item.icon className={
                      clsx(
                        "mr-3 h-5 w-5",
                        index < 8 && `text-${colors[(index * 3 % colors.length)]}-500`
                      )
                    }
                  />
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-fd-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              </NavbarMenuLink>
            ))
          }
        </NavbarMenuContent>
      </NavbarMenu>
    ),
  },

  {
    type: "custom",
    on: "nav",
    children: (
      <NavbarMenu>
        <NavbarMenuTrigger>About</NavbarMenuTrigger>
        <NavbarMenuContent>
          {
            linksAbout.map((item, index) => (
              <NavbarMenuLink href={item.link} key={item.link}>
                <item.icon className={
                      clsx(
                        "mr-3 h-5 w-5",
                        index < 8 && (["About Us", "Support Us"].includes(item.title) ? "text-red-500" : `text-${colors[(index * 5 % colors.length)]}-500`)
                      )
                    }
                  />
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-fd-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              </NavbarMenuLink>
            ))
          }
        </NavbarMenuContent>
      </NavbarMenu>
    ),
  },
];